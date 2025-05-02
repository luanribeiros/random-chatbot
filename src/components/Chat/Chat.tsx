import useChatStore from "../../store/chatStore.ts";
import ChatHeader from "../ChatHeader/ChatHeader.tsx";
import MessagesContainer from "../MessagesContainer/MessagesContainer.tsx";
import ChatInputForm from "../ChatInputForm/ChatInputForm.tsx";
import { Message } from "../../types";
import "./Chat.css";

const Chat = () => {
  const { messages, theme, sendMessage } = useChatStore();

  return (
    <div className={`chat-container ${theme}`} data-testid="chat-container">
      <ChatHeader />
      <MessagesContainer messages={messages as Message[]} />
      <ChatInputForm onSendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
