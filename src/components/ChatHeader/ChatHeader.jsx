import './ChatHeader.css';
import useChatStore from '../../store/chatStore';

const ChatHeader = () => {
    const { theme, toggleTheme } = useChatStore();

    return (
        <div className="chat-header">
            <h2>FinTalk ChatBot Challenge</h2>
            <button onClick={toggleTheme} className="theme-toggle">
                {theme === 'light' ? '☀️' : '🌕'}
            </button>
        </div>
    );
};

export default ChatHeader;