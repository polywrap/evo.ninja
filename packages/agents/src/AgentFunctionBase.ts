import { AgentFunctionResult, FunctionDefinition } from "@evo-ninja/agent-utils"
import { AgentContext } from "./AgentContext";
import { Agent } from "./Agent";

export abstract class AgentFunctionBase<TParams> {
  abstract get name(): string;
  abstract get description(): string;
  abstract get parameters(): any;

  abstract buildExecutor(agent: Agent<any>, context: AgentContext): (params: TParams, rawParams?: string) => Promise<AgentFunctionResult>;

  getDefinition(): FunctionDefinition {
    return {
      name: this.name,
      description: this.description,
      parameters: this.parameters
    };
  }
}
