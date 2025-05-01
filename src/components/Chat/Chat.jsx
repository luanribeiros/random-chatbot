import { useState, useRef, useEffect } from 'react';
import './Chat.css';

const botResponses = [
    "Olá! Como posso ajudar você hoje?",
    "Interessante, me conte mais sobre isso!",
    "Entendi perfeitamente sua questão.",
    "Que legal! Continue...",
    "Isso é muito interessante!",
    "Posso ajudar com mais alguma coisa?",
    "Compreendo sua situação.",
    "Estou aqui para ajudar!",
    "Que ótima pergunta!",
    "Vou fazer o possível para ajudar você."
];

const Chat = () => {
    const [messages, setMessages] = useState(() => {
        // Carrega as mensagens do localStorage ao inicializar
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [inputMessage, setInputMessage] = useState('');
    const [theme, setTheme] = useState('light');
    const chatContainerRef = useRef(null);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
        document.body.className = theme === 'light' ? 'dark' : '';
    };

    // Salva as mensagens no localStorage sempre que houver mudanças
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage = {
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMessage]);

        // Simula resposta do bot após 1 segundo
        setTimeout(() => {
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            const botMessage = {
                text: randomResponse,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);

        setInputMessage('');
    };

    return (
        <div className={`chat-container ${theme}`}>
            <div className="chat-header">
                <h2>FinTalk ChatBot Challenge</h2>
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
            
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