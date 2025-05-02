import { useState } from "react";

interface UseChatInputProps {
  onSendMessage: (
    message: string,
    type: "text" | "voice",
    audioBlob?: Blob
  ) => void;
}

export const useChatInput = ({ onSendMessage }: UseChatInputProps) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  return {
    inputMessage,
    handleSubmit,
    handleAudioRecorded,
    handleInputChange
  };
};