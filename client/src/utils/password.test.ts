import { isPasswordValid, getPasswordValidationMessage } from "./password";


// --- Validação ---
// Teste senha válida (true)
test("isPasswordValid retorna true para senha válida", () => {
  // Está retornando false pois a senha é menor do que 9.
  // Existe um bug de <= ao inves de < na linha 21 de password.ts
  expect(isPasswordValid("$4baCaxi")).toBe(true);
});


// Senha vazia (false)
test("isPasswordValid retorna false para senha inválida", () => {
  expect(isPasswordValid("")).toBe(false);
});

// Senha sem caracter especial (false)
test("isPasswordValid retorna false para senha inválida", () => {
  expect(isPasswordValid("amaDeir4ado")).toBe(false);
});

// Senha sem minúscula (false)
test("isPasswordValid retorna false para senha inválida", () => {
  expect(isPasswordValid("JOGA1!SAOMA&")).toBe(false);
});

// Senha sem maiúscula (false)
test("isPasswordValid retorna false para senha inválida", () => {
  expect(isPasswordValid("olharca1^do")).toBe(false);
});

// Senha sem número (false)
test("isPasswordValid retorna false para senha inválida", () => {
  expect(isPasswordValid("armaMentis&a")).toBe(false);
});


// --- Mensagens ---
test("getPasswordValidationMessage retorna mensagem correta", () => {
  expect(getPasswordValidationMessage("")).toBe("Senha é obrigatória");
  expect(getPasswordValidationMessage("amaDeir4ado")).toBe("A senha deve conter: um caractere especial");
  expect(getPasswordValidationMessage("JOGA1!SAOMA&")).toBe("A senha deve conter: uma letra minúscula");
  expect(getPasswordValidationMessage("armaMentis&a")).toBe("A senha deve conter: um número");
  expect(getPasswordValidationMessage("olharca1^do")).toBe("A senha deve conter: uma letra maiúscula");
});