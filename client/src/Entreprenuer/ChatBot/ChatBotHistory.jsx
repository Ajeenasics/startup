import React from "react";
import ReactMarkdown from "react-markdown";

function ChatBotHistory({ chatHistory }) {
  return (
    <>
    
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`d-flex align-items-start py-2 px-3 rounded-3 mb-2 ${
            message.type === "user"
              ? "bg-light text-dark"
              : "bg-primary text-white"
          }`}
        >
          {message.type === "user" && (
            <span className="me-2 fw-bold text-muted">You:</span>
          )}

          <div>
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatBotHistory;
