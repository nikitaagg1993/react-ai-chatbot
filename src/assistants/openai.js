import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

// Fail early in console if the key loading sequence breaks
if (!apiKey) {
  console.error("Vite Warning: VITE_OPEN_AI_API_KEY is not defined in environment variables!");
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY?.trim(),
  baseURL: 'http://localhost:5173/openai-api', // Triggers the clean proxy rewrite rule
  dangerouslyAllowBrowser: true,
});
export class OpenAIAssistant {
  #model;

  // Use a stable, accessible default model first
  constructor(model = "gpt-4o-mini") {
    this.#model = model;
  }

  async chat(content, history) {
    try {
      const result = await openai.chat.completions.create({
        model: this.#model,
        messages: [
          ...history, 
          { role: "user", content: content } // Correct message payload mapping syntax
        ],
      });

      return result.choices[0].message.content;
    } catch (error) {
      console.error("Error in OpenAIAssistant.chat:", error);
      throw error;
    }
  }
}
