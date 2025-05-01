import useChatStore from "../../store/chatStore.ts";
import ChatHeader from "../ChatHeader/ChatHeader.tsx";
import MessagesContainer from "../MessagesContainer/MessagesContainer.tsx";
import ChatInputForm from "../ChatInputForm/ChatInputForm.tsx";
import "./Chat.css";

interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

const Chat = () => {
  const { messages, theme, sendMessage } = useChatStore();

  return (
    <div className={`chat-container ${theme}`}>
      <ChatHeader />
      <MessagesContainer messages={messages as Message[]} />
      <ChatInputForm onSendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
