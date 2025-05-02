import { useState } from "react";
import useChatStore from "../../../store/chatStore";
import { ChatSettings } from "../../../types";

interface UseSettingsReturn {
  isOpen: boolean;
  settings: ChatSettings;
  toggleSettings: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const useSettings = (): UseSettingsReturn => {
  const { settings, updateSettings } = useChatStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSettings = () => setIsOpen(!isOpen);

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

  return {
    isOpen,
    settings,
    toggleSettings,
    handleSubmit,
  };
};
