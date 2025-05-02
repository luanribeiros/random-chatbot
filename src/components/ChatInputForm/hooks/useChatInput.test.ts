import { renderHook, act } from "@testing-library/react";
import { useChatInput } from "./useChatInput";

describe("useChatInput", () => {
  const mockOnSendMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial state and functions", () => {
    const { result } = renderHook(() => useChatInput({ onSendMessage: mockOnSendMessage }));

    expect(result.current.inputMessage).toBe("");
    expect(typeof result.current.handleSubmit).toBe("function");
    expect(typeof result.current.handleAudioRecorded).toBe("function");
    expect(typeof result.current.handleInputChange).toBe("function");
  });

  it("should update input message when handleInputChange is called", () => {
    const { result } = renderHook(() => useChatInput({ onSendMessage: mockOnSendMessage }));

    act(() => {
      result.current.handleInputChange({ target: { value: "Nova mensagem" } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.inputMessage).toBe("Nova mensagem");
  });

  it("should call onSendMessage and clear input when handleSubmit is called with valid message", () => {
    const { result } = renderHook(() => useChatInput({ onSendMessage: mockOnSendMessage }));

    act(() => {
      result.current.handleInputChange({ target: { value: "Olá" } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockOnSendMessage).toHaveBeenCalledWith("Olá", "text");
    expect(result.current.inputMessage).toBe("");
  });

  it("should not call onSendMessage when handleSubmit is called with empty message", () => {
    const { result } = renderHook(() => useChatInput({ onSendMessage: mockOnSendMessage }));

    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });

  it("should call onSendMessage with correct parameters when handleAudioRecorded is called", () => {
    const { result } = renderHook(() => useChatInput({ onSendMessage: mockOnSendMessage }));
    const mockAudioBlob = new Blob(["audio"], { type: "audio/wav" });

    act(() => {
      result.current.handleAudioRecorded(mockAudioBlob);
    });

    expect(mockOnSendMessage).toHaveBeenCalledWith("Mensagem de voz", "voice", mockAudioBlob);
  });
});