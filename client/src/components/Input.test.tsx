import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

test("renderiza o label quando informado", () => {
  render(<Input label="Email" />);
  expect(screen.getByText("Email")).toBeInTheDocument();
});

test("renderiza mensagem de erro quando informado", () => {
  render(<Input error="Campo obrigatorio" />);
  expect(screen.getByText("Campo obrigatorio")).toBeInTheDocument();
});