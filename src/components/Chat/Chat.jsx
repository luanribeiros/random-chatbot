import { useRef, useEffect, useState } from 'react';
import useChatStore from '../../store/chatStore';
import ChatHeader from '../ChatHeader/ChatHeader';
import './Chat.css';

const Chat = () => {
    const { messages, theme, sendMessage } = useChatStore();
    const [inputMessage, setInputMessage] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        sendMessage(inputMessage);
        setInputMessage('');
    };

    return (
        <div className={`chat-container ${theme}`}>
            <ChatHeader />
            
            <div className="messages-container" ref={chatContainerRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <div className="message-content">
                            <p>{message.text}</p>
                            <span className="timestamp">{message.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>

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