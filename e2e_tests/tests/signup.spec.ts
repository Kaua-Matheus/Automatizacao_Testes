import { test, expect } from '@playwright/test';

test('signup', async ({ page }) => {

  await page.goto('http://localhost:3000/signup');

  // Email
  await page.getByPlaceholder('seu@email.com').fill('emailtest02@gmail.com');

  // Senha 1
  await page.getByPlaceholder('••••••••').nth(0).fill('Aaaa11234@');
  
  // Senha 2
  await page.getByPlaceholder('••••••••').nth(1).fill('Aaaa11234@');

  await page.getByRole(
    "button",
    { name: "Criar Conta" }
).nth(1).click();

});