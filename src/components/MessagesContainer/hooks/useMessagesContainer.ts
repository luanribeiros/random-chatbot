import { useRef, useEffect } from "react";
import { Message } from "../../../types";

interface UseMessagesContainerProps {
  messages: Message[];
}

export const useMessagesContainer = ({ messages }: UseMessagesContainerProps) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return {
    chatContainerRef
  };
};