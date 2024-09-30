import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import validatePassword from "../../utils/validatePassword";
import FormPassword from "../Password";

const renderComponent = () => {
  return render(<FormPassword />);
};

describe("Render Component", () => {
  it("should render correctly", () => {
    renderComponent();

    const inputName = screen.getByPlaceholderText(/Nome/i);
    const inputEmail = screen.getByPlaceholderText(/E-mail/i);
    const inputSenha = screen.getByPlaceholderText(/Senha/i);
    const buttonSubmit = screen.getByText("Enviar");

    expect(inputName).toBeVisible();
    expect(inputEmail).toBeVisible();
    expect(inputSenha).toBeVisible();
    expect(buttonSubmit).toBeVisible();
  });
});

describe("Password Validate", () => {
  it("should return specific error message for a password with less than 6 digits", () => {
    const shortPassword = "12345";
    const result = validatePassword(shortPassword);

    expect(result).toStrictEqual([
      "Senha deve conter 6 dígitos.",
      "A senha deve estar entre 184759 e 856920.",
      "A senha deve conter pelo menos um par de dígitos adjacentes iguais.",
    ]);
  });

  it("should return specific error message for a out of range password", () => {
    const shortPassword = "123456";
    const result = validatePassword(shortPassword);

    expect(result).toStrictEqual([
      "A senha deve estar entre 184759 e 856920.",
      "A senha deve conter pelo menos um par de dígitos adjacentes iguais.",
    ]);
  });

  it("should return specific error message for a adjacent numbers", () => {
    const shortPassword = "234567";
    const result = validatePassword(shortPassword);

    expect(result).toStrictEqual([
      "A senha deve conter pelo menos um par de dígitos adjacentes iguais.",
    ]);
  });

  it("should return specific error message for decreasing numbers", () => {
    const shortPassword = "234554";
    const result = validatePassword(shortPassword);

    expect(result).toStrictEqual([
      "Os dígitos da senha devem crescer ou se manter.",
    ]);
  });
});
