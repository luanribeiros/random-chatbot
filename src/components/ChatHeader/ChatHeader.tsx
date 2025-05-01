import "./ChatHeader.css";
import useChatStore from "../../store/chatStore";

const ChatHeader = () => {
  const { theme, toggleTheme, settings } = useChatStore();

  return (
    <div className="chat-header">
      <h2>{settings.botName}</h2>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "light" ? "🌚" : "☀️"}
      </button>
    </div>
  );
};

export default ChatHeader;
