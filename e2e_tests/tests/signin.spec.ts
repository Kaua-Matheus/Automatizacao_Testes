import { test, expect } from '@playwright/test';

test('signin', async ({ page }) => {

  await page.goto('http://localhost:3000/signin');

  // Email
  await page.getByPlaceholder('seu@email.com').fill('emailtest02@gmail.com');

  // Senha 1
  await page.getByPlaceholder('••••••••').nth(0).fill('Aaaa11234@');

  await page.getByRole(
    "button",
    { name: "Entrar" }
  ).nth(1).click();

});