import {
  AgentFunctionResult,
  AgentOutputType,
  ChatMessageBuilder,
} from "@evo-ninja/agent-utils";
import { AgentFunctionBase } from "../AgentFunctionBase";
import { Agent } from "../Agent";
import { AgentContext } from "../AgentContext";

interface FunctionParams {
  filename: string;
}

export class RunPytest extends AgentFunctionBase<FunctionParams> {
  constructor() {
    super();
  }

  get name() {
    return "runPytest";
  }

  get description() {
    return `Run python test and analyses error.`;
  }

  get parameters() {
    return {
      type: "object",
      properties: {
        filename: {},
      },
      additionalProperties: false,
    };
  }

  buildExecutor({ context }: Agent<unknown>) {
    return async (
      params: FunctionParams,
      rawParams?: string
    ): Promise<AgentFunctionResult> => {
      const response = await runTest(context);

      if (response.exitCode == 0) {
        return {
          outputs: [
            {
              type: AgentOutputType.Success,
              title: "Succesfully ran test",
            },
          ],
          messages: [
            ChatMessageBuilder.functionCall(this.name, params),
            ChatMessageBuilder.functionCallResult(
              this.name,
              "Succesfully ran test"
            ),
          ],
        };
      } else {
        if (
          response.stdout ==
          "Test have reached timeout. Maybe there's an infinite loop in the code"
        ) {
          return {
            outputs: [
              {
                type: AgentOutputType.Error,
                title: "Error running tests",
              },
            ],
            messages: [
              ChatMessageBuilder.functionCall(this.name, params),
              ChatMessageBuilder.functionCallResult(
                this.name,
                "Test have reached timeout. Maybe there's an infinite loop in the code"
              ),
            ],
          };
        } else {
          const errorMessages = extractErrors(response.stdout);
          return {
            outputs: [
              {
                type: AgentOutputType.Error,
                title: "Error running tests",
              },
            ],
            messages: [
              ChatMessageBuilder.functionCall(this.name, params),
              ChatMessageBuilder.functionCallResult(this.name, errorMessages),
            ],
          };
        }
      }
    };
  }
}

const extractErrors = (errorsMessage: string) => {
  const pattern =
    /(?<=^={3,} FAILURES ={3,}\n)[\s\S]*?(?=\n^={3,} short test summary info)/gm;

  const match = errorsMessage.match(pattern);
  if (match) {
    return `Errors found in testing: \n ${match[0]}`;
  } else {
    // This should never happen
    return "Could not find errors in error message";
  }
};

const runTest = async (
  context: AgentContext
): Promise<{ exitCode: number; stdout: string; stderr: string }> => {
  const loopGuard = new Promise((_, reject) =>
    setTimeout(() => {
      reject(
        new Error(
          "10 seconds timeout reached on test. Maybe you have an infinite loop?"
        )
      );
    }, 10000)
  );
  try {
    const result = await Promise.race([
      context.workspace.exec("poetry run pytest"),
      loopGuard,
    ]);
    return result as { exitCode: number; stdout: string; stderr: string };
  } catch (e) {
    if (
      e.message ==
      "10 seconds timeout reached on test. Maybe you have an infinite loop?"
    ) {
      return {
        exitCode: 1,
        stdout:
          "Test have reached timeout. Maybe there's an infinite loop in the code",
        stderr: "",
      };
    } else {
      return {
        exitCode: 1,
        stdout: "Error thrown from tests: " + e.message,
        stderr: "",
      };
    }
  }
};