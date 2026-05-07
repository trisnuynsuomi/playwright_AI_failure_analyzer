import OpenAI from "openai";

import { AIProvider } from "./AIProvider";

import { env } from "../../config/env";

export class OpenAIProvider implements AIProvider {
  private client = new OpenAI({
    apiKey: env.openAIKey,
  });

  async analyze(prompt: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: "gpt-5-mini",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content || "";
  }
}
