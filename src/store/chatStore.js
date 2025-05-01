import { create } from 'zustand';

const useChatStore = create((set) => ({
    messages: JSON.parse(localStorage.getItem('chatMessages')) || [],
    theme: 'light',

    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        document.body.className = newTheme;
        return { theme: newTheme };
    }),

    sendMessage: (text) => set((state) => {
        const userMessage = {
            text,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };

        const newMessages = [...state.messages, userMessage];
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));

        // Simula resposta do bot após 1 segundo
        setTimeout(() => {
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

            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            const botMessage = {
                text: randomResponse,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString()
            };

            set((state) => {
                const updatedMessages = [...state.messages, botMessage];
                localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
                return { messages: updatedMessages };
            });
        }, 1000);

        return { messages: newMessages };
    }),
}));

export default useChatStore;