<<<<<<< Updated upstream
import { AgentFunctionResult, AgentOutputType, ChatMessageBuilder } from "@evo-ninja/agent-utils";
=======
>>>>>>> Stashed changes
import { AgentBaseConfig, AgentBaseContext } from "../../AgentBase";
import { ThinkFunction } from "../../functions/Think";
import { WriteFunctionFunction } from "../../functions/WriteFunction";

export interface ScriptWriterRunArgs {
  namespace: string;
  description: string;
  args: string;
}

export interface ScriptWriterContext extends AgentBaseContext {}

export const SCRIPTWRITER_AGENT_CONFIG: AgentBaseConfig<ScriptWriterRunArgs, ScriptWriterContext> = {
  initialMessages: ({
    namespace,
    description,
    args
  }) => [
    {
      role: "assistant",
      content:
`I am an agent designed to write JavaScript functions. 
1. Always think through the implementation step-by-step before coding.
2. Submit your code using the writeFunction function.
3. Don't get disheartened by initial failures. Retry until success.
4. Ensure authenticity; avoid creating mock functionality.`
    },
    {
      role: "user", content:
`Your goal is to compose the body of an async JavaScript function.

Details:
- Function namespace: "${namespace}"
- Arguments: ${args}
- Description: "${description}"

Guidelines:
1. Treat function arguments as locally defined variables. You're crafting just the function body.
2. Limit yourself to the provided arguments. Don't introduce new ones.
3. If the function needs to return a value, use the return keyword.
4. For libraries, utilize the require function for imports.
5. Stick to the following libraries: ${WriteFunctionFunction.formatSupportedLibraries()}.
6. Avoid using external APIs that mandate authentication or API keys.
7. Refrain from recursive calls to the "${namespace}" function.

Example:
\`\`\`
const fs = require('fs');
return fs.readFileSync(path, encoding);
\`\`\``
    }
  ],
  loopPreventionPrompt: "Assistant, try executing the writeFunction.",
  functions: [
<<<<<<< Updated upstream
    {
      definition: {
        name: THINK_FN_NAME,
        description: `Think.`,
        parameters: {
          type: "object",
          properties: {
            thoughts: {
              type: "string",
              description: "Your current thoughts about the topic."
            },
          },
          required: ["thoughts"],
          additionalProperties: false
        },
      },
      buildExecutor: (_) => {
        return async (params: ThinkFuncParameters): Promise<AgentFunctionResult> => {
          return THINK_SUCCESS(params);
        };
      }
    },
    {
      definition: {
        name: WRITE_FN_NAME,
        description: `Writes the function.`,
        parameters: {
          type: "object",
          properties: {
            namespace: {
              type: "string",
              description: "The namespace of the function, e.g. fs.readFile"
            },
            description: {
              type: "string",
              description: "The detailed description of the function."
            },
            arguments: {
              type: "string",
              description: "The arguments of the function. E.g. '{ path: string, encoding: string }'"
            },
            code: {
              type: "string",
              description: "The code of the function."
            }
          },
          required: ["namespace", "description", "arguments", "code"],
          additionalProperties: false
        },
      },
      buildExecutor: (context: EvoContext) => {
        return async (params: { 
          namespace: string, 
          description: string, 
          arguments: string, 
          code: string 
        }): Promise<AgentFunctionResult> => {
          if (params.namespace.startsWith("agent.")) {
            return CANNOT_CREATE_IN_AGENT_NAMESPACE_ERROR(WRITE_FN_NAME, params);
          }
    
          if (extractRequires(params.code).some(x => !ALLOWED_LIBS.includes(x))) {
            return CANNOT_REQUIRE_LIB_ERROR(WRITE_FN_NAME, params);
          }
    
          context.workspace.writeFileSync("index.js", params.code);
    
          return WRITE_SUCCESS(params);
        };
      }
    }
=======
    new ThinkFunction(),
    new WriteFunctionFunction()
>>>>>>> Stashed changes
  ],
  shouldTerminate: (functionCalled) => functionCalled.name === "writeFunction"
}
