import { useState } from "react";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
import ChatSettings from "../ChatSettings/ChatSettings";
import "./ChatInputForm.css";

interface ChatInputFormProps {
  onSendMessage: (
    message: string,
    type: "text" | "voice",
    audioBlob?: Blob
  ) => void;
}

const ChatInputForm = ({ onSendMessage }: ChatInputFormProps) => {
  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    onSendMessage(inputMessage, "text");
    setInputMessage("");
  };

  const handleAudioRecorded = (audioBlob: Blob) => {
    onSendMessage("Mensagem de voz", "voice", audioBlob);
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button type="submit">⬆️</button>
      </form>
      <div className="action-buttons">
        <VoiceRecorder onAudioRecorded={handleAudioRecorded} />
        <ChatSettings />
      </div>
    </div>
  );
};

export default ChatInputForm;
