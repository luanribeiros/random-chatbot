import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
import ChatSettings from "../ChatSettings/ChatSettings";
import { useChatInput } from "./hooks/useChatInput";
import "./ChatInputForm.css";

interface ChatInputFormProps {
  onSendMessage: (
    message: string,
    type: "text" | "voice",
    audioBlob?: Blob
  ) => void;
}

const ChatInputForm = ({ onSendMessage }: ChatInputFormProps) => {
  const { inputMessage, handleSubmit, handleAudioRecorded, handleInputChange } =
    useChatInput({ onSendMessage });

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
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
