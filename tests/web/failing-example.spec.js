const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../../pages/TodoPage');

test.describe('Intentional failure demo', () => {
  test('this test is designed to fail demonstrates error visibility', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    await todoPage.addTodo('Check for fail ');
    await expect(todoPage.todoItems).toHaveCount(1);

    // Expected Error
    await expect(todoPage.todoItems.first()).toHaveText(
      'Fail for demo',
      { timeout: 3000 }
    );
  });

  test('locator not found', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    await page.getByTestId('buttondemo').click({ timeout: 2000 });
  });
});