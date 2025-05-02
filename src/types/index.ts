export type MessageType = "text" | "voice";

export interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  userId: string;
  type: MessageType;
  audioUrl?: string;
}

export type Theme = "light" | "dark";

export interface Message {
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  userId: string;
  type: "text" | "voice";
  audioUrl?: string;
}

export interface ChatSettings {
  botName: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface ChatStore {
  messages: Message[];
  theme: Theme;
  userId: string;
  settings: ChatSettings;
  toggleTheme: () => void;
  sendMessage: (
    message: string,
    type: "text" | "voice",
    audioBlob?: Blob
  ) => void;
  updateSettings: (settings: Partial<ChatSettings>) => void;
}

export interface MessagesContainerProps {
  messages: Message[];
}

export interface ChatInputFormProps {
  onSendMessage: (message: string) => void;
}
