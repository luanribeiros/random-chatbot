import { useSettings } from "./hooks/useSettings";
import "./ChatSettings.css";

const ChatSettings = () => {
  const { isOpen, settings, toggleSettings, handleSubmit } = useSettings();

  return (
    <div className="chat-settings">
      <button onClick={toggleSettings} className="settings-toggle">
        ⚙️
      </button>

      {isOpen && (
        <div className="settings-modal">
          <form onSubmit={handleSubmit} data-testid="settings-form">
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
              <button type="button" onClick={toggleSettings}>
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
