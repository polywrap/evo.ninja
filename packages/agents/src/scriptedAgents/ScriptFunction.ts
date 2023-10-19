import {
  AgentFunctionResult,
  AgentOutputType,
  AgentVariables,
  ChatMessageBuilder,
  JsEngine,
  JsEngine_GlobalVar,
  Scripts,
  shimCode
} from "@evo-ninja/agent-utils"
import { AgentFunctionBase } from "../AgentFunctionBase";
import { AgentContext } from "../AgentContext";
import { Agent } from "../Agent";

export abstract class ScriptFunction<TParams> extends AgentFunctionBase<TParams> {
  constructor(private readonly scripts: Scripts) {
    super();
  }

  get description(): string {
    const scriptName = this.name.split("_").join(".");
    const script = this.scripts.getScriptByName(scriptName);

    if (!script) {
      throw new Error(`Unable to find the script ${scriptName}`);
    }

    return script.description;
  }

  onSuccess(agent: Agent, params: any, rawParams: string | undefined, result: string, variables: AgentVariables): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `[${agent.config.prompts.name}] ${this.name}`,
          content: `${params.query}`
        }
      ],
      messages: [
        ChatMessageBuilder.functionCall(this.name, rawParams),
        ...ChatMessageBuilder.functionCallResultWithVariables(this.name, result, variables)
      ]
    }
  }

  onFailure(agent: Agent, params: any, rawParams: string | undefined, error: string, variables: AgentVariables): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Error,
          title: `[${agent.config.prompts.name}] Error in ${this.name}: ${error}`
        }
      ],
      messages: [
        ChatMessageBuilder.functionCall(this.name, rawParams),
        ...ChatMessageBuilder.functionCallResultWithVariables(this.name, `Error: ${error}`, variables)
      ]
    }
  }

  buildExecutor(agent: Agent, context: AgentContext): (params: TParams, rawParams?: string) => Promise<AgentFunctionResult> {
    return async (params: any, rawParams?: string): Promise<AgentFunctionResult> => {
      const scriptName = this.name.split("_").join(".");
      const script = context.scripts.getScriptByName(scriptName);

      if (!script) {
        return this.onFailure(agent, params, rawParams, `Unable to find the script ${scriptName}`, context.variables);
      }

      const globals: JsEngine_GlobalVar[] = Object.entries(params).map(
        (entry) => ({
          name: entry[0],
          value: JSON.stringify(entry[1])
        })
      );

      const jsEngine = new JsEngine(context.client);
      const result = await jsEngine.evalWithGlobals({
        src: shimCode(script.code),
        globals
      });

      if (result.ok) {
        if (result.value.error == null) {
          const jsPromiseOutput = context.client.jsPromiseOutput;
          if (jsPromiseOutput.ok) {
            const result = typeof jsPromiseOutput.value !== "string" ? JSON.stringify(jsPromiseOutput.value) : jsPromiseOutput.value;
            return this.onSuccess(agent, params, rawParams, result, context.variables);
          } else {
            return this.onFailure(agent, params, rawParams, jsPromiseOutput.error.message, context.variables);
          }
        } else {
          return this.onFailure(agent, params, rawParams, result.value.error.toString(), context.variables);
        }
      } else {
        return this.onFailure(agent, params, rawParams,result.error?.toString() ?? "Unknown error", context.variables);
      }
    };
  }
}
