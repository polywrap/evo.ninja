import { LlmApi, LlmOptions, LlmResponse, Chat } from ".";
import { env } from "../sys";

import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
  ChatCompletionRequestMessageFunctionCall,
  Configuration,
  OpenAIApi
} from "openai";

export {
  ChatCompletionResponseMessage as OpenAIResponse,
  ChatCompletionRequestMessageFunctionCall as OpenAIFunctionCall
};

export class OpenAI implements LlmApi {
  private _configuration: Configuration;
  private _api: OpenAIApi;

  constructor(
    private _apiKey: string,
    private _defaultModel: string
  ) {
    this._configuration = new Configuration({
    apiKey: this._apiKey
    });
    this._api = new OpenAIApi(this._configuration);
  }

  async getResponse(
    chat: Chat,
    functionDefinitions: any[],
    options?: LlmOptions
  ): Promise<LlmResponse | undefined> {
    const completion = await this.createChatCompletion({
      messages: chat.messages,
      functions: functionDefinitions,
      temperature: options ? options.temperature : 0,
      max_tokens: options ? options.max_tokens : env().MAX_TOKENS_PER_RESPONSE
    });

    if (completion.data.choices.length < 1) {
      throw Error("Chat completion choices length was 0...");
    }

    const choice = completion.data.choices[0];

    if (!choice.message) {
      throw Error(
        `Chat completion message was undefined: ${JSON.stringify(choice, null, 2)}`
      );
    }

    return choice.message;
  }

  public createChatCompletion(options: {
    messages: ChatCompletionRequestMessage[];
    model?: string;
    functions?: any;
  } & LlmOptions) {
    return this._api.createChatCompletion({
      messages: options.messages,
      model: options.model || this._defaultModel,
      functions: options.functions,
      function_call: options.functions ? "auto" : undefined,
      temperature: options.temperature || 0,
      max_tokens: options.max_tokens
    });
  }
}
