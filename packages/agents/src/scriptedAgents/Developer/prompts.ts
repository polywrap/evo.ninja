import { ChatMessage } from "@evo-ninja/agent-utils";
import { AgentFunctionBase } from "../../AgentFunctionBase";
import { GoalRunArgs } from "../../Agent";
import { AgentPrompts } from "../../AgentPrompts";

export const prompts = ( 
  writeFileFn: AgentFunctionBase<any>,
  onGoalAchieved: AgentFunctionBase<any>,
): AgentPrompts<GoalRunArgs> => ({
  name: "Developer",
  expertise: `building software projects with one or more files.`,
  initialMessages: ({ goal }: GoalRunArgs): ChatMessage[] => [
    { 
      role: "user", 
      content: `
You are an expert developer assistant that excels at coding related tasks.

You can produce code using the code function. Give it a complete and precise query describing the code that you need produced.

You must not interact with the user or ask question for clarification. Solve the task to the best of your abilities.`
    },
    { role: "user", content: goal},
  ],
  loopPreventionPrompt: `Assistant, you appear to be in a loop, try executing a different function.`,
});
