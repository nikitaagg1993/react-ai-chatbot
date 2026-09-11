import { useState } from "react";
import { Loader } from "./components/Loader/Loader";
import { Chat } from "./components/Chat/Chat";
import { Controls } from "./components/Controls/Controls";
import styles from "./App.module.css";
import { Assistant } from "./assistants/googleai";
import { OpenAIAssistant } from "./assistants/openai";


function App() {
  const assistant = new Assistant();
  // const openaiAssistant = new OpenAIAssistant();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    setIsLoading(true);
    try {
      const result = await assistant.chat(content, messages);
      addMessage({ content: result, role: "assistant" });
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "system",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.App}>
       {isLoading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="/chat-bot.png" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} isDisabled={isLoading} />
    </div>
  );
}

export default App;