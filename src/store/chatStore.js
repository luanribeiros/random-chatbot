import { create } from 'zustand';

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
                const botResponses = [
                    "Olá! Estou aqui para ajudar você hoje. Como posso ser útil?",
                    "Que ótimo você estar aqui! Como posso tornar seu dia melhor?",
                    "Adorei sua mensagem! Como posso auxiliar você neste momento?",
                    "Seja muito bem-vindo(a)! Em que posso ajudar?",
                    "É um prazer conversar com você! Como posso contribuir hoje?",
                    "Que bom ter você por aqui! Como posso tornar sua experiência mais agradável?",
                    "Estou à disposição para ajudar no que precisar. O que você gostaria de saber?",
                    "Agradeço seu contato! Como posso ser mais útil para você?",
                    "Que maravilha receber sua mensagem! Como posso auxiliar?",
                    "Estou muito feliz em poder ajudar! O que você precisa?",
                    "Conte comigo para o que precisar! Como posso colaborar?",
                    "É sempre um prazer poder ajudar! O que você gostaria de saber?",
                    "Estou aqui para tornar seu dia mais fácil! Como posso ajudar?",
                    "Que bom ter você aqui conosco! Como posso ser útil?",
                    "Ficarei feliz em poder auxiliar! O que você precisa?",
                    "Pode contar comigo! Como posso fazer seu dia melhor?",
                    "Estou à sua disposição para ajudar! O que você gostaria de saber?",
                    "Será um prazer auxiliar você! Como posso ajudar?",
                    "Que ótimo poder conversar com você! Como posso contribuir?",
                    "Estou aqui para facilitar sua experiência! Como posso ajudar?"
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
    };
});

export default useChatStore;