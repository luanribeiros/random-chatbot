import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatInputForm from "./ChatInputForm";

describe("ChatInputForm", () => {
  const mockOnSendMessage = jest.fn();

  beforeEach(() => {
    mockOnSendMessage.mockClear();
    jest.clearAllMocks();
  });

  it("should render the form with input and buttons", () => {
    render(<ChatInputForm onSendMessage={mockOnSendMessage} />);

    expect(
      screen.getByPlaceholderText("Digite sua mensagem...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "⬆️" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "🎤" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "⚙️" })).toBeInTheDocument();
  });

  it("should send text message when form is submitted", () => {
    render(<ChatInputForm onSendMessage={mockOnSendMessage} />);

    const input = screen.getByPlaceholderText("Digite sua mensagem...");
    const submitButton = screen.getByRole("button", { name: "⬆️" });

    fireEvent.change(input, { target: { value: "Olá, mundo!" } });
    fireEvent.click(submitButton);

    expect(mockOnSendMessage).toHaveBeenCalledWith("Olá, mundo!", "text");
    expect(input).toHaveValue("");
  });

  it("should not send message when input is empty", () => {
    render(<ChatInputForm onSendMessage={mockOnSendMessage} />);

    const submitButton = screen.getByRole("button", { name: "⬆️" });
    fireEvent.click(submitButton);

    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });

  it("should send voice message when audio is recorded", async () => {
    const mockStream = {
      getTracks: () => [
        {
          stop: jest.fn(),
        },
      ],
    };

    const mockMediaRecorder = {
      start: jest.fn(),
      stop: jest.fn(),
      ondataavailable: null as any,
      onstop: null as any,
      state: "inactive",
      stream: mockStream,
    };

    const MediaRecorderMock = jest.fn(() => mockMediaRecorder) as jest.Mock & {
      isTypeSupported: jest.Mock;
    };
    MediaRecorderMock.isTypeSupported = jest.fn().mockReturnValue(true);

    Object.defineProperty(global.navigator, "mediaDevices", {
      writable: true,
      value: {
        getUserMedia: jest.fn().mockResolvedValue(mockStream),
      },
    });

    (global as any).MediaRecorder = MediaRecorderMock;

    render(<ChatInputForm onSendMessage={mockOnSendMessage} />);

    const voiceButton = screen.getByRole("button", { name: "🎤" });
    await fireEvent.click(voiceButton);

    const audioBlob = new Blob(["audio data"], { type: "audio/wav" });
    if (typeof mockMediaRecorder.ondataavailable === "function") {
      mockMediaRecorder.ondataavailable({ data: audioBlob } as BlobEvent);
    }

    if (typeof mockMediaRecorder.onstop === "function") {
      mockMediaRecorder.onstop({} as Event);
    }

    expect(mockOnSendMessage).toHaveBeenCalledWith(
      "Mensagem de voz",
      "voice",
      expect.any(Blob)
    );
  });
});
