import OpenAI from "openai";
import { Assistant as OpenAIAssistant } from "../assistants/openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: import.meta.env.VITE_DEEPSEEK_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

console.log("DeepSeek AI API Key:", import.meta.env.VITE_DEEPSEEK_AI_API_KEY);

export class Assistant extends OpenAIAssistant {
  constructor(model = "deepseek-flash", client = openai) {
    super(model, client);
  }
}