import { AgentFunction, AgentContext, AgentFunctionResult, AgentChatMessage } from "../../agent-function";
import {
  JsEngine_GlobalVar,
  JsEngine_Module,
  shimCode
} from "../../../wrap";
import JSON5 from "json5";
import { EXECUTE_SCRIPT_OUTPUT, FUNCTION_CALL_FAILED } from "../../prompts";

const FN_NAME = "executeScript";

export const executeScript: AgentFunction = {
  definition: {
    name: FN_NAME,
    description: `Execute an script.`,
    parameters: {
      type: "object",
      properties: {
        namespace: {
          type: "string",
          description: "Namespace of the script to execute"
        },
        arguments: {
          type: "string",
          description: "The arguments to pass into the script being executed",
        },
        result: {
          type: "string",
          description: "The name of the variable to store the result of the script"
        }
      },
      required: ["name", "arguments", "result"],
      additionalProperties: false
    },
  },
  buildChatMessage(args: any, result: AgentFunctionResult): AgentChatMessage {
    const argsStr = JSON.stringify(args, null, 2);

    return result.ok
      ? {
          type: "success",
          title: `Script ${args.namespace} executed successfully!`,
          content: 
            `# Function Call:\n\`\`\`javascript\n${FN_NAME}(${argsStr})\n\`\`\`\n` +
            EXECUTE_SCRIPT_OUTPUT(args.result, result.value),
        }
      : {
          type: "error",
          title: `Script ${args.namespace} failed to execute!`,
          content: FUNCTION_CALL_FAILED(FN_NAME, result.error, args),
        };
  },
  buildExecutor(
    context: AgentContext
  ) {
    return async (options: { namespace: string, arguments: any, result: string }) => {
      try {
        const script = context.scripts.getScriptByName(options.namespace);

        if (!script) {
          return ResultErr(`Script ${options.namespace} not found.`);
        }

        let args: any = undefined;
        args = options.arguments.replace(/\{\{/g, "\\{\\{").replace(/\}\}/g, "\\}\\}");
        try {

          args = JSON5.parse(options.arguments);

          if (args) {
            const replaceVars = (str: string, vars: any) => {
              return str.replace(/{{(.*?)}}/g, (match, key) => {
                return vars[key.trim()] || match;  // if the key doesn't exist in vars, keep the original match
              });
            }
            for (const key of Object.keys(args)) {
              if (typeof args[key] === "string") {
                args[key] = replaceVars(
                  args[key],
                  Object.keys(context.globals).reduce(
                    (a, b) => ({ [b]: JSON.parse(context.globals[b]), ...a}), {}
                  )
                );
              }
            }
          }
        } catch {
          return ResultErr(`Invalid arguments provided for script ${options.namespace}: '${options.arguments}' is not valid JSON!`);
        }

        const globals: JsEngine_GlobalVar[] =
          Object.entries(args).concat(Object.entries(context.globals))
            .map((entry) => ({
              name: entry[0],
              value: JSON.stringify(entry[1]),
            })
          );

        const result = await JsEngine_Module.evalWithGlobals({
          src: shimCode(script.code),
          globals
        }, context.client);

        if (result.ok && context.client.jsPromiseOutput.ok) {
          context.globals[options.result] =
            JSON.stringify(context.client.jsPromiseOutput.value);
        }

        return result.ok
          ? result.value.error == null
            ? context.client.jsPromiseOutput.ok
              ? ResultOk(JSON.stringify(context.client.jsPromiseOutput.value))
              : ResultErr(JSON.stringify(context.client.jsPromiseOutput.error))
            : ResultErr(result.value.error)
          : ResultErr(result.error?.toString() ?? "");
      } catch (e: any) {
        return ResultErr(e);
      }
    };
  }
};
