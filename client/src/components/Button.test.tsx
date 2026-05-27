import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

test("renderiza o texto do botao", () => {
  render(<Button>Enviar</Button>);
  expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
});

test("fica desabilitado quando isLoading = true", () => {
  render(<Button isLoading>Enviar</Button>);
  const button = screen.getByRole("button", { name: "Carregando..." });
  expect(button).toBeDisabled();
});