import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "./page";
import { authService } from "../../service/auth/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

jest.mock("../../components/Header", () => () => <div />);
jest.mock("../../service/auth/auth", () => ({
  authService: { signIn: jest.fn() },
}));
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;
const mockSignIn = authService.signIn as jest.Mock;

test("mostra erros quando envia formulario vazio", () => {
  mockUseAuth.mockReturnValue({ login: jest.fn() });
  mockUseRouter.mockReturnValue({ push: jest.fn() });

  render(<SignIn />);

  fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

  expect(screen.getByText(/Email.*obrigat/i)).toBeInTheDocument();
  expect(screen.getByText(/Senha.*obrigat/i)).toBeInTheDocument();
});

// Ao realizar login, aplicação deve direcionar cliente para "/""
test("faz login e redireciona quando credenciais sao validas", async () => {
  const login = jest.fn();
  const push = jest.fn();

  mockUseAuth.mockReturnValue({ login });
  mockUseRouter.mockReturnValue({ push });

  mockSignIn.mockResolvedValueOnce({ id: 1, email: "joao@exemplo.com" });

  render(<SignIn />);

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "joao@exemplo.com" },
  });
  fireEvent.change(screen.getByLabelText("Senha"), {
    target: { value: "Abcd1234@" },
  });

  fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

  expect(mockSignIn).toHaveBeenCalledWith({
    email: "joao@exemplo.com",
    password: "Abcd1234@",
  });
  expect(login).toHaveBeenCalledWith({ id: 1, email: "joao@exemplo.com" });
  expect(push).toHaveBeenCalledWith("/");
});