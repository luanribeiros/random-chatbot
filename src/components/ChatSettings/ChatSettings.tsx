import { useState } from "react";
import useChatStore from "../../store/chatStore";
import "./ChatSettings.css";

const ChatSettings = () => {
  const { settings, updateSettings } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateSettings({
      botName: formData.get("botName") as string,
      primaryColor: formData.get("primaryColor") as string,
      secondaryColor: formData.get("secondaryColor") as string,
    });
    setIsOpen(false);
  };

  return (
    <div className="chat-settings">
      <button onClick={() => setIsOpen(!isOpen)} className="settings-toggle">
        ⚙️
      </button>

      {isOpen && (
        <div className="settings-modal">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="botName">Nome do Bot</label>
              <input
                type="text"
                id="botName"
                name="botName"
                defaultValue={settings.botName}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="primaryColor">Cor Principal</label>
              <input
                type="color"
                id="primaryColor"
                name="primaryColor"
                defaultValue={settings.primaryColor}
              />
            </div>

            <div className="form-group">
              <label htmlFor="secondaryColor">Cor Secundária</label>
              <input
                type="color"
                id="secondaryColor"
                name="secondaryColor"
                defaultValue={settings.secondaryColor}
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setIsOpen(false)}>
                Cancelar
              </button>
              <button type="submit">Salvar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatSettings;
