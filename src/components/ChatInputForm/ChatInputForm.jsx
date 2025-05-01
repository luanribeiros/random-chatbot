import { useState } from 'react';
import './ChatInputForm.css';

const ChatInputForm = ({ onSendMessage }) => {
    const [inputMessage, setInputMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        onSendMessage(inputMessage);
        setInputMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="input-container">
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
            />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default ChatInputForm;