import { AgentFunctionResult, AgentOutputType, AgentVariables, ChatMessageBuilder } from "@evo-ninja/agent-utils";
import { AgentFunctionBase } from "../AgentFunctionBase";
import { AgentContext } from "../AgentContext";
import { Agent } from "../Agent";

interface ThinkFuncParameters { 
  thoughts: string
}

export class ThinkFunction extends AgentFunctionBase<ThinkFuncParameters> {

  name: string = "think";
  description: string = "Helps me to think what I should do if I don't know how to achieve the goal";
  parameters: any = {
    type: "object",
    properties: {
      thoughts: {
        type: "string",
        description: "Your current thoughts about the topic."
      },
    },
    required: ["thoughts"],
    additionalProperties: false
  };

  buildExecutor(_: Agent, context: AgentContext): (params: ThinkFuncParameters, rawParams?: string) => Promise<AgentFunctionResult> {
    return async (params: ThinkFuncParameters, rawParams?: string): Promise<AgentFunctionResult> => {
      return this.onSuccess(params, rawParams, params.thoughts, context.variables);
    };
  }

  public onSuccess(params: any, rawParams: string | undefined, result: string, variables: AgentVariables) {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `Thinking...`,
          content: 
            `## Thoughts:\n` +
            `\`\`\`\n` +
            `${params.thoughts}\n` +
            `\`\`\``
        }
      ],
      messages: [
        ChatMessageBuilder.functionCall(this.name, rawParams),
        ...ChatMessageBuilder.functionCallResultWithVariables(this.name, result, variables),
      ]
    }
  }
}