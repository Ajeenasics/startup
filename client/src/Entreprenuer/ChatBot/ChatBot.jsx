import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import ChatBotHistory from "./ChatBotHistory";
import ChatBotLoading from "./ChatBotLoading";
import { secret_key } from "./SecretKey";
import { CommonNavbar } from "../../components/commonNavbar/commonNavbar";
import HomepageNavbar from "../../components/commonNavbar/HomepageNavbar";

function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize your Gemini API
  const genAI = new GoogleGenerativeAI(secret_key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Function to send user message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // Call Gemini API to get a response
      const result = await model.generateContent(userInput);
      const response = await result.response;
      console.log(response);
      // Add Gemini's response to the chat history
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch {
      console.error("Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Function to clear the chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div>
      <CommonNavbar />
      <HomepageNavbar />
      <div className="container my-4">
        <h1 className="text-center mb-4">Chatbot</h1>

        <div className="card shadow-sm">
          <div className="card-body">
            <ChatBotHistory chatHistory={chatHistory} />
            <ChatBotLoading isLoading={isLoading} />
          </div>
        </div>

        <div className="d-flex mt-4">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type your message..."
            value={userInput}
            onChange={handleUserInput}
          />
          <button
            className="btn btn-primary"
            onClick={sendMessage}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
        <button
          className="btn btn-secondary mt-4"
          onClick={clearChat}
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
