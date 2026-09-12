import { GoogleGenAI } from "@google/genai";

const googleai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
});

export class Assistant {
    #chat;

    constructor(model = "gemini-3.6-flash") {
        this.#chat = googleai.chats.create({ model });
    }

    async chat(content) {
        try {
            const result = await this.#chat.sendMessage({ message: content });
            return result.text;
        } catch (error) {
            throw this.#parseError(error);
        }
    }

    async *chatStream(content) {
        try {
            const result = await this.#chat.sendMessageStream({ message: content });

            for await (const chunk of result) {
                yield chunk.text;
            }
        } catch (error) {
            throw this.#parseError(error);
        }
    }
    #parseError(error) {
        try {

          const outerErrorObject = JSON.parse(error?.message);
          console.log("Outer Error Object:", outerErrorObject);    
          // Parse the nested stringified JSON from the outer error
          const innerErrorObject = JSON.parse(outerErrorObject?.error?.message);
    
          return innerErrorObject?.error;
        } catch (parseError) {
          return error;
        }
      }
    
}