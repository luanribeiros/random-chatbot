import useChatStore from '../../store/chatStore';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessagesContainer from '../MessagesContainer/MessagesContainer';
import ChatInputForm from '../ChatInputForm/ChatInputForm';
import './Chat.css';

const Chat = () => {
    const { messages, theme, sendMessage } = useChatStore();

    return (
        <div className={`chat-container ${theme}`}>
            <ChatHeader />
            <MessagesContainer messages={messages} />
            <ChatInputForm onSendMessage={sendMessage} />
        </div>
    );
};

export default Chat;