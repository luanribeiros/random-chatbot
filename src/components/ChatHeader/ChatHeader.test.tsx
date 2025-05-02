import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatHeader from "./ChatHeader";

const mockStore = {
  theme: "light",
  toggleTheme: jest.fn(),
  settings: {
    botName: "Test Bot",
    primaryColor: "#f1487e",
    secondaryColor: "#e13d71",
  },
  messages: [],
  addMessage: jest.fn(),
  updateSettings: jest.fn(),
};

jest.mock("../../store/chatStore", () => ({
  __esModule: true,
  default: () => mockStore,
}));

describe("ChatHeader", () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    mockStore.theme = "light";
    mockStore.toggleTheme = mockToggleTheme;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the bot name correctly", () => {
    render(<ChatHeader />);
    expect(screen.getByText("Test Bot")).toBeInTheDocument();
  });

  it("should render theme toggle button with correct emoji in light theme", () => {
    render(<ChatHeader />);
    const themeButton = screen.getByRole("button");
    expect(themeButton).toHaveTextContent("🌚");
  });

  it("should render theme toggle button with correct emoji in dark theme", () => {
    mockStore.theme = "dark";

    render(<ChatHeader />);
    const themeButton = screen.getByRole("button");
    expect(themeButton).toHaveTextContent("☀️");
  });

  it("should call toggleTheme when button is clicked", () => {
    render(<ChatHeader />);
    const themeButton = screen.getByRole("button");

    fireEvent.click(themeButton);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
