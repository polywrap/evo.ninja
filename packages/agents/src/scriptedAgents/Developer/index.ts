import { WriteFileFunction } from "../../functions/WriteFile";
import { AgentContext } from "../../AgentContext";
import { Agent } from "../../Agent";
import { AgentConfig } from "../../AgentConfig";
import { prompts } from "./prompts";
import { OnGoalAchievedFunction } from "../../functions/OnGoalAchieved";
import { CodeFunction } from "../../functions/Code";

export class DeveloperAgent extends Agent {
  constructor(context: AgentContext) {
    const writeFileFn = new WriteFileFunction(context.scripts);
    const onGoalAchieved = new OnGoalAchievedFunction(context.scripts);

    super(
      new AgentConfig(
        () => prompts(writeFileFn, onGoalAchieved),
        [
          new CodeFunction(context.llm, context.chat.tokenizer),
          onGoalAchieved,
        ], 
        context.scripts
      ),
      context
    );
  }
}
