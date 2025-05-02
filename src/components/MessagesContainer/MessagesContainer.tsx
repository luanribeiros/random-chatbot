import { Message } from "../../types";
import { useMessagesContainer } from "./hooks/useMessagesContainer";
import "./MessagesContainer.css";

interface MessagesContainerProps {
  messages: Message[];
}

const MessagesContainer = ({ messages }: MessagesContainerProps) => {
  const { chatContainerRef } = useMessagesContainer({ messages });

  return (
    <div className="messages-container" ref={chatContainerRef}>
      {messages.map((message, index) => (
        <div key={index} className={`message ${message.sender}`} role="article">
          <div className="message-content">
            {message.type === "voice" && message.audioUrl && (
              <audio
                controls
                src={message.audioUrl}
                className="voice-message"
                data-testid="voice-message-audio"
              />
            )}
            <p>{message.text}</p>
            <span className="timestamp">{message.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesContainer;
