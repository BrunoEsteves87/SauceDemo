const { test, expect } = require('@playwright/test');

test('login com sucesso', async ({ page }) => {
  // Navegar para a página
  await page.goto('https://www.saucedemo.com/', { timeout: 90000, waitUntil: 'domcontentloaded' });

  // Verificar se o botão está presente no DOM
  await expect(page.locator('#login-button')).toHaveCount(1);

  // Esperar até que o botão esteja visível
  await page.locator('#login-button').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('#login-button')).toBeVisible();

  // Preencher os campos e clicar no botão de login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Capturar evidência e validar a URL
  await page.screenshot({ path: "./tests/test-case/evidencias/login.png" });
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});


// Teste 2: Login com usuário inválido
test('login com usuário inválido', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
  await expect(page.locator('#login-button')).toBeVisible();

  await page.fill('#user-name', 'usuario_invalido');
  await page.fill('#password', 'secret_sauce');
  
  await page.locator('#login-button').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('#login-button')).toBeEnabled();
  await page.click('#login-button');
  
  await page.screenshot({ path: "./tests/test-case/evidencias/usuario_invalido.png" });
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});

// Teste 3: Login com senha inválida
test('login com senha inválida', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
  await expect(page.locator('#login-button')).toBeVisible();

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'senha_invalida');
  
  await page.locator('#login-button').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('#login-button')).toBeEnabled();
  await page.click('#login-button');
  
  await page.screenshot({ path: "./tests/test-case/evidencias/senha_invalida.png" });
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});

// Teste 4: Login com usuário e senha em branco
test('login com usuário e senha em branco', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/', { timeout: 60000, waitUntil: 'domcontentloaded' });
  await expect(page.locator('#login-button')).toBeVisible();

  await page.fill('#user-name', '');
  await page.fill('#password', '');
  
  await page.locator('#login-button').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('#login-button')).toBeEnabled();
  await page.click('#login-button');
  
  await page.screenshot({ path: "./tests/test-case/evidencias/usuario_e_senha_vazio.png" });
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
});

