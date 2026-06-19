import { test, expect } from '@playwright/test';

test.describe("WEB Cadastro e Curtida", () => {

  test('signup - signin - curtida', async ({ page }) => {

    const email = `test${Date.now()}@gmail.com`
    const senha = 'Aaaa11234@'

    // Fluxo 1 - Cadastro de usuário isoladamente
    await test.step("Cadastro", async () => {
      await page.goto('http://localhost:3000/signup');
      await page.getByPlaceholder('seu@email.com').fill(email);
      await page.getByPlaceholder('••••••••').nth(0).fill(senha);
      await page.getByPlaceholder('••••••••').nth(1).fill(senha);
      await page.getByRole(
        "button",
        { name: "Criar Conta" }
    ).nth(1).click();
      await expect(page).toHaveURL('http://localhost:3000/');
      await expect(page.getByText('Posts Curtidos')).toBeVisible();
    });


    // Fluxo 2 - Login
    await test.step("Login", async () => {
      await page.getByRole(
        "button",
        { name: "Sair" }
      ).nth(0).click();
      await page.getByRole(
        "button",
        { name: "Entrar" }
      ).nth(0).click();
      await page.getByPlaceholder('seu@email.com').fill(email);
      await page.getByPlaceholder('••••••••').nth(0).fill(senha);
      await page.getByRole(
        "button",
        { name: "Entrar" }
      ).nth(1).click();
      await expect(page).toHaveURL('http://localhost:3000/');
      await expect(page.getByText('Posts Curtidos')).toBeVisible();
    });


    // Fluxo 3 - Teste de curtida
    await test.step("Curtida", async () => {
      await expect(page.getByText('Posts Curtidos')).toBeVisible();
      await page.getByRole(
        "button",
        { name: "Curtir" }
      ).nth(0).click();
      await page.getByRole(
        "button",
        { name: "Posts Curtidos" }
      ).nth(0).click();
      await expect(page).toHaveURL('http://localhost:3000/auth/liked');
      await expect(page.getByRole("button", { name: 'Curtido' }).nth(1)).toBeVisible();

    });
  });
})