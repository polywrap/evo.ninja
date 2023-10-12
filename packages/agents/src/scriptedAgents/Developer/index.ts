import { ScriptedAgent, ScriptedAgentConfig, ScriptedAgentContext } from "../ScriptedAgent";
import { WriteFileFunction } from "../../functions/WriteFile";
import { OnGoalAchievedFunction } from "../../functions/OnGoalAchieved";
import { OnGoalFailedFunction } from "../../functions/OnGoalFailed";
import { ReadFileFunction } from "../../functions/ReadFile";
import { ReadDirectoryFunction } from "../../functions/ReadDirectory";

export class DeveloperAgent extends ScriptedAgent {
  constructor(context: ScriptedAgentContext) {
    const onGoalAchievedFn = new OnGoalAchievedFunction(context.client, context.scripts);
    const onGoalFailedFn = new OnGoalFailedFunction(context.client, context.scripts);
    const writeFileFn = new WriteFileFunction(context.client, context.scripts);
    const readFileFn = new ReadFileFunction(context.client, context.scripts);
    
    const config: ScriptedAgentConfig = {
      name: "Developer",
      expertise: "Building software projects with one or more files.",
      initialMessages: ({ goal }) => [
        { 
          role: "user", 
          content: `You are an expert developer assistant that excels at coding related tasks across various programming languages.
You have access to the file system using the ${writeFileFn.name} and ${readFileFn.name} functions.
You plan and write clean, effective, and safe code to files using the ${writeFileFn.name} function.
When a script is asked, you must write it. Unless explicitly told not to do that in the goal.
If the goal outlines unit testing criteria for your code, ensure you fully comprehend these requirements before starting.
Subsequently, write your code to satisfy those testing standards.

Guidelines:
- **Simplicity**: Write code as simply as possible, focusing only on the functionality you've been requested to build.
- **Avoid Blocking Code**: Refrain from using constructs that could lead to infinite loops or block the execution unless explicitly requested. Always ensure the code you write is non-blocking and terminates as expected, regardless of the programming language.

You must not interact with the user or ask questions for clarification. Solve the task to the best of your abilities with the provided guidelines.`
        },
        { role: "user", content: goal},
      ],
      loopPreventionPrompt: "Assistant, you appear to be in a loop, try executing a different function.",
      functions: [
        onGoalAchievedFn,
        onGoalFailedFn,
        writeFileFn,
        readFileFn,
        new ReadDirectoryFunction(context.client, context.scripts)
      ],
      shouldTerminate: (functionCalled) => {
        return [
          onGoalAchievedFn.name,
          onGoalFailedFn.name
        ].includes(functionCalled.name);
      },
    };

    super(config, context);
  }
}