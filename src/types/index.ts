// Tipos relacionados às mensagens do chat
export interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
}

// Tipos relacionados ao tema
export type Theme = 'light' | 'dark';

// Interface do store do chat
export interface ChatStore {
    messages: Message[];
    theme: Theme;
    toggleTheme: () => void;
    sendMessage: (text: string) => void;
}

// Props dos componentes
export interface MessagesContainerProps {
    messages: Message[];
}

export interface ChatInputFormProps {
    onSendMessage: (message: string) => void;
}