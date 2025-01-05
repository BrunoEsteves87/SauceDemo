const {test,expect} = require ('@playwright/test');

test('login com sucesso', async ({page}) => {

await page.goto('https://www.saucedemo.com/');
await page.fill('#user-name','standard_user');
await page.fill('#password','secret_sauce');
await page.click('#login-button');
await page.screenshot({path: "./tests/test-case/evidencias/login.png"});

await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});
