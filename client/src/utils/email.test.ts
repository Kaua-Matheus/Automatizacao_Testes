import { isEmailValid, getEmailValidationMessage } from "../utils/email";

// Testa um email comum que deve passar no teste.
test("isEmailValid retorna true para email válido", () => {
  expect(isEmailValid("joao@exemplo.com")).toBe(true);
});

// Testa se um email sem @ passa na validação.
test("isEmailValid retorna false para email inválido", () => {
  expect(isEmailValid("joaoexemplo.com")).toBe(false);
});

// Testa se um email com caracteres especiais passa na validação.
test("isEmailValid retorna false para email inválido", () => {
  // Contém um erro pois o email possui caracteres especiais e não deveria ser válido.
  expect(isEmailValid("joa&aaa@gmail.com")).toBe(false);
});

// Mensagens
// Testa se as mensagens do email estão corretas.
test("getEmailValidationMessage retorna mensagem correta", () => {
  expect(getEmailValidationMessage("")).toBe("Email é obrigatório");
  expect(getEmailValidationMessage("joaoexemplo.com")).toBe("Email inválido");
  expect(getEmailValidationMessage("joao@exemplo.com")).toBe("");
});