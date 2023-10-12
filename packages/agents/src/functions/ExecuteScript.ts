import { Agent, AgentFunctionResult, AgentOutputType, ChatMessageBuilder, JsEngine, JsEngine_GlobalVar, Scripts, WrapClient, shimCode, trimText } from "@evo-ninja/agent-utils";
import JSON5 from "json5";
import { AgentFunctionBase } from "../AgentFunctionBase";
import { FUNCTION_CALL_FAILED, FUNCTION_CALL_SUCCESS_CONTENT } from "../agents/Scripter/utils";
import { AgentBaseContext } from "../AgentBase";

interface ExecuteScriptFuncParameters { 
  namespace: string, 
  description: string, 
  arguments: string,
  variable?: string
};

export class ExecuteScriptFunction extends AgentFunctionBase<ExecuteScriptFuncParameters> {
  constructor(private client: WrapClient, private scripts: Scripts, private globals: Record<string, string>) {
    super();
  }

  get name(): string {
    return "executeScript";
  }

  get description(): string {
    return `Execute an script.`;
  }

  get parameters() {
    return {
      type: "object",
      properties: {
        namespace: {
          type: "string",
          description: "Namespace of the script to execute"
        },
        arguments: {
          type: "string",
          description: "JSON-formatted arguments to pass into the script being executed. You can replace a value with a global variable by using {{varName}} syntax.",
        },
        variable: {
          type: "string",
          description: "The name of a variable to store the script's result in"
        }
      },
      required: ["namespace", "arguments", "result"],
      additionalProperties: false
    }
  }

  buildExecutor(agent: Agent<unknown>, context: AgentBaseContext): (params: ExecuteScriptFuncParameters) => Promise<AgentFunctionResult> {
    return async (params: ExecuteScriptFuncParameters): Promise<AgentFunctionResult> => {
      try {
        const script = this.scripts.getScriptByName(params.namespace);

        if (!script) {
          return this.onError(params.namespace, this.scriptNotFound(params), params);
        }

        let args: any = undefined;
        args = params.arguments ? params.arguments.replace(/\{\{/g, "\\{\\{").replace(/\}\}/g, "\\}\\}") : "{}";
        try {

          args = JSON5.parse(params.arguments);

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
                  Object.keys(this.globals).reduce(
                    (a, b) => ({ [b]: JSON.parse(this.globals[b]), ...a}), {}
                  )
                );
              }
            }
          }
        } catch {
          return this.onError(params.namespace, this.invalidExecuteScriptArgs(params), params);
        }

        const globals: JsEngine_GlobalVar[] =
          Object.entries(args).map((entry) => ({
              name: entry[0],
              value: JSON.stringify(entry[1]),
            })
          );

        const jsEngine = new JsEngine(this.client);

        const result = await jsEngine.evalWithGlobals({
          src: shimCode(script.code),
          globals
        });

        if (params.variable && result.ok && this.client.jsPromiseOutput.ok) {
          this.globals[params.variable] =
            JSON.stringify(this.client.jsPromiseOutput.value);
        }

        return result.ok
          ? result.value.error == null
            ? this.client.jsPromiseOutput.ok
              ? this.onSuccess(params.namespace, this.client.jsPromiseOutput.value, params)
              : this.onError(params.namespace, JSON.stringify(this.client.jsPromiseOutput.error), params)
            : this.onError(params.namespace, result.value.error, params)
          : this.onError(params.namespace, result.error?.toString(), params);
      
      } catch (e: any) {
        return this.onError(params.namespace, e.toString(), params);
      }
    };
  }

  private onSuccess(scriptName: string, result: any, params: ExecuteScriptFuncParameters): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `Executed '${scriptName}' script.`,
          content: FUNCTION_CALL_SUCCESS_CONTENT(
            this.name,
            params,
            this.executeScriptOutput(params.variable, result),
          )
        }
      ],
      messages: [
        ChatMessageBuilder.functionCall(this.name, params),
        ChatMessageBuilder.functionCallResult(
          this.name,
          this.executeScriptOutput(params.variable, result)
        ),
      ]
    }
  }

  private onError(scriptName: string, error: string | undefined, params: ExecuteScriptFuncParameters) {
    return {
      outputs: [
        {
          type: AgentOutputType.Error,
          title: `'${scriptName}' script failed to execute!`,
          content: FUNCTION_CALL_FAILED(params, this.name, error ?? "Unknown error"),
        }
      ],
      messages: [
        ChatMessageBuilder.functionCall(this.name, params),
        ChatMessageBuilder.functionCallResult(
          this.name,
          `Error executing script '${scriptName}'\n` + 
          `\`\`\`\n` +
          `${
            error && typeof error === "string"
              ? trimText(error, 300)
              : error 
                ? trimText(JSON.stringify(error, null, 2), 300)
                : "Unknown error"
            }\n` +
          `\`\`\``
        ),
      ]
    }
  }

  private invalidExecuteScriptArgs(params: ExecuteScriptFuncParameters) {
    return `Invalid arguments provided for script ${params.namespace}: '${params.arguments ?? ""}' is not valid JSON!`;
  }

  private scriptNotFound(params: ExecuteScriptFuncParameters) {
    return `Script '${params.namespace}' not found!`;
  }

  private executeScriptOutput(varName: string | undefined, result: string | undefined) {
    if (!result || result === "undefined" || result === "\"undefined\"") {
      return `No result returned.`;
    } else if (result.length > 3000) {
      return `Preview of JSON result:\n` + 
            `\`\`\`\n` + 
            `${trimText(result, 3000)}\n` + 
            `\`\`\`\n` + 
            `${this.storedResultInVar(varName)}`;
    } else {
      return `JSON result: \n\`\`\`\n${result}\n\`\`\`\n${this.storedResultInVar(varName)}`;
    }
  }

  private storedResultInVar(varName: string | undefined) {
    if (varName && varName.length > 0) {
      return `Result stored in variable: {{${varName}}}`;
    } else {
      return "";
    }
  }
}