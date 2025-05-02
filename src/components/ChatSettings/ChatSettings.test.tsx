import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChatSettings from "./ChatSettings";
import { useSettings } from "./hooks/useSettings";

jest.mock("./hooks/useSettings", () => ({
  useSettings: jest.fn(),
}));

describe("ChatSettings", () => {
  const mockToggleSettings = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockSettings = {
    botName: "Test Bot",
    primaryColor: "#f1487e",
    secondaryColor: "#e13d71",
  };

  beforeEach(() => {
    (useSettings as jest.Mock).mockImplementation(() => ({
      isOpen: false,
      settings: mockSettings,
      toggleSettings: mockToggleSettings,
      handleSubmit: mockHandleSubmit,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render settings button", () => {
    render(<ChatSettings />);
    const settingsButton = screen.getByRole("button", { name: "⚙️" });
    expect(settingsButton).toBeInTheDocument();
  });

  it("should not show modal when isOpen is false", () => {
    render(<ChatSettings />);
    const modal = screen.queryByRole("form");
    expect(modal).not.toBeInTheDocument();
  });

  it("should show modal with form when isOpen is true", () => {
    (useSettings as jest.Mock).mockImplementation(() => ({
      isOpen: true,
      settings: mockSettings,
      toggleSettings: mockToggleSettings,
      handleSubmit: mockHandleSubmit,
    }));

    render(<ChatSettings />);

    expect(screen.getByLabelText("Nome do Bot")).toBeInTheDocument();
    expect(screen.getByLabelText("Cor Principal")).toBeInTheDocument();
    expect(screen.getByLabelText("Cor Secundária")).toBeInTheDocument();
  });

  it("should call toggleSettings when settings button is clicked", () => {
    render(<ChatSettings />);
    const settingsButton = screen.getByRole("button", { name: "⚙️" });

    fireEvent.click(settingsButton);

    expect(mockToggleSettings).toHaveBeenCalledTimes(1);
  });

  it("should call handleSubmit when form is submitted", () => {
    (useSettings as jest.Mock).mockImplementation(() => ({
      isOpen: true,
      settings: mockSettings,
      toggleSettings: mockToggleSettings,
      handleSubmit: mockHandleSubmit,
    }));

    render(<ChatSettings />);

    const form = screen.getByTestId("settings-form");

    fireEvent.submit(form, {
      preventDefault: () => {},
    });

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        preventDefault: expect.any(Function),
      })
    );
  });

  it("should call toggleSettings when cancel button is clicked", () => {
    (useSettings as jest.Mock).mockImplementation(() => ({
      isOpen: true,
      settings: mockSettings,
      toggleSettings: mockToggleSettings,
      handleSubmit: mockHandleSubmit,
    }));

    render(<ChatSettings />);

    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    fireEvent.click(cancelButton);

    expect(mockToggleSettings).toHaveBeenCalledTimes(1);
  });

  it("should display current settings values in form", () => {
    (useSettings as jest.Mock).mockImplementation(() => ({
      isOpen: true,
      settings: mockSettings,
      toggleSettings: mockToggleSettings,
      handleSubmit: mockHandleSubmit,
    }));

    render(<ChatSettings />);

    const botNameInput = screen.getByLabelText(
      "Nome do Bot"
    ) as HTMLInputElement;
    const primaryColorInput = screen.getByLabelText(
      "Cor Principal"
    ) as HTMLInputElement;
    const secondaryColorInput = screen.getByLabelText(
      "Cor Secundária"
    ) as HTMLInputElement;

    expect(botNameInput.value).toBe("Test Bot");
    expect(primaryColorInput.value).toBe("#f1487e");
    expect(secondaryColorInput.value).toBe("#e13d71");
  });
});
