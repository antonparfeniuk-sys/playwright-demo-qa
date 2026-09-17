const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../../pages/TodoPage');

test.describe('Intentional failure demo', () => {
  test('this test is designed to fail – demonstrates error visibility', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    await todoPage.addTodo('I will fail later');
    await expect(todoPage.todoItems).toHaveCount(1);

    // Expected Error
    await expect(todoPage.todoItems.first()).toHaveText(
      'This text does not exist – intentional failure for demo',
      { timeout: 3000 }
    );
  });

  test('another soft failure example – locator not found', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    await page.getByTestId('non-existent-button-for-demo').click({ timeout: 2000 });
  });
});