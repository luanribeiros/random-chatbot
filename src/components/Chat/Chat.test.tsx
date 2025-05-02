import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chat from "./Chat";

const mockStore = {
  messages: [
    {
      text: "Olá",
      sender: "user",
      timestamp: "10:00:00",
      userId: "123",
      type: "text",
    },
    {
      text: "Como posso ajudar?",
      sender: "bot",
      timestamp: "10:00:01",
      userId: "123",
      type: "text",
    },
  ],
  theme: "light",
  sendMessage: jest.fn(),
  settings: {
    botName: "Test Bot",
    primaryColor: "#f1487e",
    secondaryColor: "#e13d71",
  },
};

jest.mock("../../store/chatStore", () => ({
  __esModule: true,
  default: () => mockStore,
}));

describe("Chat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component correctly", () => {
    render(<Chat />);

    expect(screen.getByTestId("chat-container")).toHaveClass(
      "chat-container light"
    );
  });

  it("should render all subcomponents", () => {
    render(<Chat />);

    expect(screen.getByText("Test Bot")).toBeInTheDocument();

    expect(screen.getByText("Olá")).toBeInTheDocument();
    expect(screen.getByText("Como posso ajudar?")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Digite sua mensagem...")
    ).toBeInTheDocument();
  });

  it("should apply dark theme correctly", () => {
    mockStore.theme = "dark";
    render(<Chat />);

    expect(screen.getByTestId("chat-container")).toHaveClass(
      "chat-container dark"
    );
  });

  it("should pass messages correctly to MessagesContainer", () => {
    render(<Chat />);

    const messages = screen.getAllByRole("article");
    expect(messages).toHaveLength(2);
  });
});
