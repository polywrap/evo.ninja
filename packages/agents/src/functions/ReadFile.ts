import { AgentOutputType, trimText, ChatMessageBuilder, AgentFunctionResult, AgentVariables, Scripts } from "@evo-ninja/agent-utils"
import { ScriptFunction } from "../scriptedAgents/ScriptFunction"
import { Agent } from "../Agent";

interface ReadFileFuncParameters { 
  path: string;
  encoding: string;
};

export class ReadFileFunction extends ScriptFunction<ReadFileFuncParameters> {
  constructor(scripts: Scripts, private _saveThreshold?: number) {
    super(scripts);
  }

  name: string = "fs_readFile";
  parameters: any = {
    type: "object",
    properties: {
      path: {
        type: "string",
      },
      encoding: {
        type: "string"
      },
    },
    required: ["path", "encoding"],
    additionalProperties: false
  };

  onSuccess(agent: Agent, params: ReadFileFuncParameters, rawParams: string | undefined, result: string, variables: AgentVariables): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `[${agent.config.prompts.name}] ${this.name}`,
          content: `${params.path}\n` +
            `${params.encoding}\n` +
            `${trimText(result, 200)}`
        }
      ],
      messages: [
        ChatMessageBuilder.functionCall(this.name, rawParams),
        ...ChatMessageBuilder.functionCallResultWithVariables(this.name, result, variables, this._saveThreshold)
      ]
    }
  }
}