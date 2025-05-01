// Tipos relacionados às mensagens do chat
export type MessageType = 'text' | 'voice';

export interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: string;
    userId: string;
    type: MessageType;
    audioUrl?: string;
}

// Tipos relacionados ao tema
export type Theme = 'light' | 'dark';

// Interface do store do chat
export interface UserBotResponses {
    userId: string;
    responses: string[];
}

export interface ChatStore {
    messages: Message[];
    theme: Theme;
    userId: string;
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