import { create } from "zustand";
import botResponses from "../data/botResponses.json";
import { ChatStore, Message } from "../types";

const useChatStore = create<ChatStore>((set) => {
  // Aplicar o tema inicial ao body
  const initialTheme =
    (localStorage.getItem("theme") as "light" | "dark") || "light";
  document.body.className = initialTheme;

  return {
    messages: JSON.parse(
      localStorage.getItem("chatMessages") || "[]"
    ) as Message[],
    theme: initialTheme,

    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        document.body.className = newTheme;
        localStorage.setItem("theme", newTheme);
        return { theme: newTheme };
      }),

    sendMessage: (text: string) =>
      set((state) => {
        const userMessage: Message = {
          text,
          sender: "user",
          timestamp: new Date().toLocaleTimeString(),
        };

        const newMessages = [...state.messages, userMessage];
        localStorage.setItem("chatMessages", JSON.stringify(newMessages));

        // Simula resposta do bot após 1 segundo
        setTimeout(() => {
          const randomResponse =
            botResponses.responses[
              Math.floor(Math.random() * botResponses.responses.length)
            ];

          const botMessage: Message = {
            text: randomResponse,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString(),
          };

          set((state) => {
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
