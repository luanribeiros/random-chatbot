import { renderHook } from "@testing-library/react";
import { useMessagesContainer } from "./useMessagesContainer";
import { Message } from "../../../types";

describe("useMessagesContainer", () => {
  const mockMessages: Message[] = [
    {
      text: "Olá",
      sender: "user",
      timestamp: "10:00",
      type: "text",
      userId: "123",
    },
  ];

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(HTMLElement.prototype, "scrollTop", {
      configurable: true,
      value: 0,
      writable: true,
    });
  });

  it("should return chatContainerRef", () => {
    const { result } = renderHook(() =>
      useMessagesContainer({ messages: mockMessages })
    );

    expect(result.current.chatContainerRef.current).toBe(null);
  });

  it("should scroll to bottom when messages change", () => {
    const { result, rerender } = renderHook(
      (props: { messages: Message[] }) => useMessagesContainer(props),
      { initialProps: { messages: [] as Message[] } }
    );

    const mockElement = document.createElement("div");
    Object.defineProperty(mockElement, "scrollHeight", {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(mockElement, "scrollTop", {
      configurable: true,
      value: 0,
      writable: true,
    });

    result.current.chatContainerRef.current = mockElement;

    rerender({ messages: mockMessages });

    expect(mockElement.scrollTop).toBe(mockElement.scrollHeight);
  });

  it("should not throw error when ref is null", () => {
    const { rerender } = renderHook(
      (props: { messages: Message[] }) => useMessagesContainer(props),
      { initialProps: { messages: [] as Message[] } }
    );

    expect(() => rerender({ messages: mockMessages })).not.toThrow();
  });
});
