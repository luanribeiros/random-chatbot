import { renderHook, act } from "@testing-library/react";
import { useVoiceRecorder } from "./useVoiceRecorder";

describe("useVoiceRecorder", () => {
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

  it("should initialize with isRecording as false", () => {
    const { result } = renderHook(() =>
      useVoiceRecorder({ onAudioRecorded: mockOnAudioRecorded })
    );

    expect(result.current.isRecording).toBe(false);
  });

  it("should start recording when startRecording is called", async () => {
    const { result } = renderHook(() =>
      useVoiceRecorder({ onAudioRecorded: mockOnAudioRecorded })
    );

    await act(async () => {
      await result.current.startRecording();
    });

    expect(result.current.isRecording).toBe(true);
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({
      audio: true,
    });
    expect(mockMediaRecorder.start).toHaveBeenCalled();
  });

  it("should stop recording when stopRecording is called", async () => {
    const { result } = renderHook(() =>
      useVoiceRecorder({ onAudioRecorded: mockOnAudioRecorded })
    );

    await act(async () => {
      await result.current.startRecording();
    });

    act(() => {
      result.current.stopRecording();
    });

    expect(result.current.isRecording).toBe(false);
    expect(mockMediaRecorder.stop).toHaveBeenCalled();
  });

  it("should call onAudioRecorded when recording is finished", async () => {
    const { result } = renderHook(() =>
      useVoiceRecorder({ onAudioRecorded: mockOnAudioRecorded })
    );

    await act(async () => {
      await result.current.startRecording();
    });

    const mockAudioData = new Blob(["test audio"], { type: "audio/wav" });
    mockMediaRecorder.ondataavailable({ data: mockAudioData });
    mockMediaRecorder.onstop();

    expect(mockOnAudioRecorded).toHaveBeenCalledWith(expect.any(Blob));
  });

  it("should handle microphone access error", async () => {
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

    const { result } = renderHook(() =>
      useVoiceRecorder({ onAudioRecorded: mockOnAudioRecorded })
    );

    await act(async () => {
      await result.current.startRecording();
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(
      "Não foi possível acessar o microfone. Verifique as permissões."
    );
    expect(result.current.isRecording).toBe(false);

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });
});