import { create } from "zustand";
import { ChatStore, Message, ChatSettings } from "../types";
import { botResponseSets } from "../data/botResponses";
import { v4 as uuidv4 } from "uuid";

const getInitialSettings = (): ChatSettings => {
  const savedSettings = localStorage.getItem("chatSettings");
  return savedSettings
    ? JSON.parse(savedSettings)
    : {
        botName: "FinTalk Bot",
        primaryColor: "#f1487e",
        secondaryColor: "#e13d71",
      };
};

const getUserId = (): string => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
  }
  return userId;
};

const getUserType = (userId: string): "default" | "premium" | "vip" => {
  const userTypes = ["default", "premium", "vip"];
  const hash = userId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return userTypes[hash % 3] as "default" | "premium" | "vip";
};

const useChatStore = create<ChatStore>((set) => {
  const initialTheme =
    (localStorage.getItem("theme") as "light" | "dark") || "light";
  document.body.className = initialTheme;
  const userId = getUserId();
  const initialSettings = getInitialSettings();

  document.documentElement.style.setProperty(
    "--primary-color",
    initialSettings.primaryColor
  );
  document.documentElement.style.setProperty(
    "--secondary-color",
    initialSettings.secondaryColor
  );

  return {
    messages: JSON.parse(
      localStorage.getItem("chatMessages") || "[]"
    ) as Message[],
    theme: initialTheme,
    userId,
    settings: initialSettings,

    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        document.body.className = newTheme;
        localStorage.setItem("theme", newTheme);
        return { theme: newTheme };
      }),

    updateSettings: (newSettings: Partial<ChatSettings>) =>
      set((state) => {
        const updatedSettings = { ...state.settings, ...newSettings };
        localStorage.setItem("chatSettings", JSON.stringify(updatedSettings));

        if (newSettings.primaryColor) {
          document.documentElement.style.setProperty(
            "--primary-color",
            newSettings.primaryColor
          );
        }
        if (newSettings.secondaryColor) {
          document.documentElement.style.setProperty(
            "--secondary-color",
            newSettings.secondaryColor
          );
        }

        return { settings: updatedSettings };
      }),

    sendMessage: (text: string, type: "text" | "voice", audioBlob?: Blob) =>
      set((state) => {
        let audioUrl = "";

        if (type === "voice" && audioBlob) {
          audioUrl = URL.createObjectURL(audioBlob);
        }

        const userMessage: Message = {
          text,
          sender: "user",
          timestamp: new Date().toLocaleTimeString(),
          userId: state.userId,
          type,
          audioUrl,
        };

        const newMessages = [...state.messages, userMessage];
        localStorage.setItem("chatMessages", JSON.stringify(newMessages));

        setTimeout(() => {
          const userType = getUserType(state.userId);
          const responses = botResponseSets[userType];
          const randomResponse =
            responses[Math.floor(Math.random() * responses.length)];

          const botMessage: Message = {
            text:
              type === "voice"
                ? "Recebi sua mensagem de voz! " + randomResponse
                : randomResponse,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString(),
            userId: state.userId,
            type: "text",
          };

          set((state: any) => {
            const updatedMessages = [...state.messages, botMessage];
            localStorage.setItem(
              "chatMessages",
              JSON.stringify(updatedMessages)
            );
            return { messages: updatedMessages };
          });
        }, 1000);

        return { messages: newMessages };
      }),
  };
});

export default useChatStore;
