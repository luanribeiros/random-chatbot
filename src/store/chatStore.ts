import { create } from "zustand";
import { ChatStore, Message } from "../types";
import { botResponseSets } from "../data/botResponses";
import { v4 as uuidv4 } from "uuid";

const getUserId = (): string => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
  }
  return userId;
};

const getUserType = (userId: string): "default" | "premium" | "vip" => {
  // Simula uma lógica de negócio para determinar o tipo do usuário
  const userTypes = ["default", "premium", "vip"];
  const hash = userId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return userTypes[hash % 3] as "default" | "premium" | "vip";
};

const useChatStore = create<ChatStore | any>((set) => {
  const initialTheme =
    (localStorage.getItem("theme") as "light" | "dark") || "light";
  document.body.className = initialTheme;
  const userId = getUserId();

  return {
    messages: JSON.parse(
      localStorage.getItem("chatMessages") || "[]"
    ) as Message[],
    theme: initialTheme,
    userId,

    toggleTheme: () =>
      set((state: any) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        document.body.className = newTheme;
        localStorage.setItem("theme", newTheme);
        return { theme: newTheme };
      }),

    sendMessage: (text: string, type: "text" | "voice", audioBlob?: Blob) =>
      set((state: any) => {
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

        // Bot response
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
