import { Message, MessagesContainerProps } from '../../types';
import { useRef, useEffect } from 'react';
import './MessagesContainer.css';

const MessagesContainer = ({ messages }: MessagesContainerProps) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
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
    );
};

export default MessagesContainer;