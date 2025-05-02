import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import VoiceRecorder from "./VoiceRecorder";

describe("VoiceRecorder", () => {
  const mockOnAudioRecorded = jest.fn();
  let mockMediaRecorder: any;

  beforeEach(() => {
    jest.clearAllMocks();

    const mockMediaStream = {
      getTracks: () => [
        {
          stop: jest.fn(),
        },
      ],
    };
    const mockGetUserMedia = jest.fn().mockResolvedValue(mockMediaStream);

    Object.defineProperty(navigator, "mediaDevices", {
      value: { getUserMedia: mockGetUserMedia },
      writable: true,
    });

    mockMediaRecorder = {
      start: jest.fn(),
      stop: jest.fn(),
      ondataavailable: null,
      onstop: null,
      stream: mockMediaStream,
    };

    global.MediaRecorder = jest
      .fn()
      .mockImplementation(
        () => mockMediaRecorder
      ) as unknown as typeof MediaRecorder;
    global.MediaRecorder.isTypeSupported = jest.fn().mockReturnValue(true);
  });

  it("should render record button correctly", () => {
    render(<VoiceRecorder onAudioRecorded={mockOnAudioRecorded} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("🎤");
    expect(button).toHaveClass("voice-recorder-button");
    expect(button).not.toHaveClass("recording");
  });

  it("should start recording when button is clicked", async () => {
    render(<VoiceRecorder onAudioRecorded={mockOnAudioRecorded} />);

    const button = screen.getByRole("button");
    await act(async () => {
      fireEvent.click(button);
    });

    expect(button).toHaveTextContent("⏹️");
    expect(button).toHaveClass("recording");
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
      audio: true,
    });
    expect(MediaRecorder).toHaveBeenCalled();
  });

  it("should stop recording when button is clicked again", async () => {
    render(<VoiceRecorder onAudioRecorded={mockOnAudioRecorded} />);

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(button).toHaveTextContent("🎤");
    expect(button).not.toHaveClass("recording");
  });

  it("should handle recording data and call onAudioRecorded", async () => {
    render(<VoiceRecorder onAudioRecorded={mockOnAudioRecorded} />);

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    const mockAudioData = new Blob(["test audio"], { type: "audio/wav" });
    mockMediaRecorder.ondataavailable({ data: mockAudioData });

    mockMediaRecorder.onstop();

    expect(mockOnAudioRecorded).toHaveBeenCalledWith(expect.any(Blob));
  });

  it("should handle getUserMedia error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation();

    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: jest
          .fn()
          .mockRejectedValue(new Error("Permission denied")),
      },
      writable: true,
    });

    render(<VoiceRecorder onAudioRecorded={mockOnAudioRecorded} />);

    const button = screen.getByRole("button");
    await act(async () => {
      fireEvent.click(button);
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(
      "Não foi possível acessar o microfone. Verifique as permissões."
    );

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
