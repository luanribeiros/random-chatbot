import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MessagesContainer from "./MessagesContainer";
import { Message } from "../../types";

describe("MessagesContainer", () => {
  const mockMessages: Message[] = [
    {
      text: "Olá, como posso ajudar?",
      sender: "bot",
      timestamp: "10:00",
      type: "text",
      userId: "123",
    },
    {
      text: "Mensagem de voz",
      sender: "user",
      timestamp: "10:01",
      type: "voice",
      userId: "123",
      audioUrl: "http://example.com/audio.mp3",
    },
  ];

  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  it("should render messages correctly", () => {
    render(<MessagesContainer messages={mockMessages} />);

    expect(screen.getByText("Olá, como posso ajudar?")).toBeInTheDocument();
    expect(screen.getByText("Mensagem de voz")).toBeInTheDocument();
  });

  it("should render timestamps for messages", () => {
    render(<MessagesContainer messages={mockMessages} />);

    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("10:01")).toBeInTheDocument();
  });

  it("should apply correct CSS classes based on sender", () => {
    render(<MessagesContainer messages={mockMessages} />);

    const messages = screen.getAllByRole("article");
    expect(messages[0]).toHaveClass("message", "bot");
    expect(messages[1]).toHaveClass("message", "user");
  });

  it("should render audio element for voice messages", () => {
    render(<MessagesContainer messages={mockMessages} />);

    const audioElement = screen.getByTestId("voice-message-audio");
    expect(audioElement).toBeInTheDocument();
    expect(audioElement).toHaveAttribute("src", "http://example.com/audio.mp3");
    expect(audioElement).toHaveClass("voice-message");
  });

  it("should not render audio element for text messages", () => {
    render(<MessagesContainer messages={[mockMessages[0]]} />);

    const audioElement = screen.queryByRole("audio");
    expect(audioElement).not.toBeInTheDocument();
  });

  it("should render empty container when no messages are provided", () => {
    render(<MessagesContainer messages={[]} />);

    const messages = screen.queryAllByRole("article");
    expect(messages).toHaveLength(0);
  });
});
