import { renderHook, act } from "@testing-library/react";
import { useSettings } from "./useSettings";

const mockUpdateSettings = jest.fn();
const mockSettings = {
  botName: "Test Bot",
  primaryColor: "#f1487e",
  secondaryColor: "#e13d71",
};

jest.mock("../../../store/chatStore", () => ({
  __esModule: true,
  default: () => ({
    settings: mockSettings,
    updateSettings: mockUpdateSettings,
  }),
}));

describe("useSettings", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return correct initial state", () => {
    const { result } = renderHook(() => useSettings());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.settings).toEqual(mockSettings);
    expect(typeof result.current.toggleSettings).toBe("function");
    expect(typeof result.current.handleSubmit).toBe("function");
  });

  it("should toggle isOpen state when toggleSettings is called", () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.toggleSettings();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleSettings();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should call updateSettings with correct form values", () => {
    const { result } = renderHook(() => useSettings());

    const formValues = {
      botName: "Novo Bot",
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
    };

    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        elements: {
          botName: { value: formValues.botName },
          primaryColor: { value: formValues.primaryColor },
          secondaryColor: { value: formValues.secondaryColor },
        },
      },
    };

    global.FormData = jest.fn().mockImplementation(() => ({
      get: jest.fn((name) => formValues[name as keyof typeof formValues]),
    }));

    act(() => {
      result.current.handleSubmit(
        mockEvent as unknown as React.FormEvent<HTMLFormElement>
      );
    });

    expect(mockUpdateSettings).toHaveBeenCalledWith(formValues);
    expect(result.current.isOpen).toBe(false);
  });
});
