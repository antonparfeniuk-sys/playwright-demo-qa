const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../../pages/TodoPage');

// Ці тести спеціально падають.
// Потрібні тільки для демонстрації помилок, скріншотів і відео.

test.describe('Demo of failing tests', () => {
  test('should fail with wrong text', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();

    await todoPage.addTodo('I will fail');

    //expected error
    await expect(todoPage.todoItems.first()).toHaveText(
      'This text is wrong on purpose',
      { timeout: 3000 }
    );
  });

  test('should fail because element does not exist', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();

    //not usable button
    await page.getByTestId('this-button-does-not-exist').click({ timeout: 2000 });
  });
});