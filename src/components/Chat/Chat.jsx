import { useState } from 'react';
import useChatStore from '../../store/chatStore';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessagesContainer from '../MessagesContainer/MessagesContainer';
import './Chat.css';

const Chat = () => {
    const { messages, theme, sendMessage } = useChatStore();
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        sendMessage(inputMessage);
        setInputMessage('');
    };

    return (
        <div className={`chat-container ${theme}`}>
            <ChatHeader />
            <MessagesContainer messages={messages} />
            <form onSubmit={handleSendMessage} className="input-container">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Chat;