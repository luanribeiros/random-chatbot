import { create } from 'zustand';
import botResponses from '../data/botResponses.json';

const useChatStore = create((set) => {
    // Aplicar o tema inicial ao body
    const initialTheme = localStorage.getItem('theme') || 'light';
    document.body.className = initialTheme;

    return {
        messages: JSON.parse(localStorage.getItem('chatMessages')) || [],
        theme: initialTheme,

        toggleTheme: () => set((state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            document.body.className = newTheme;
            localStorage.setItem('theme', newTheme);
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
                const randomResponse = botResponses.responses[Math.floor(Math.random() * botResponses.responses.length)];
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
    };
});

export default useChatStore;