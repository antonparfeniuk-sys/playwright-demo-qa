const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../../pages/TodoPage');

test.describe('TodoMVC - Web E2E', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('single todo', async () => {
    await todoPage.addTodo('Buy milk');
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Buy milk');
  });

  test('should add multiple todos', async () => {
    const todos = [
      'Task 1 - prepare test data',
      'Task 2 - write API contract tests',
      'Task 3 - setup CI pipeline',
      'Task 4 - review regression suite',
      'Task 5 - update documentation',
    ];

    await todoPage.addTodos(todos);
    await expect(todoPage.todoItems).toHaveCount(todos.length);

    const texts = await todoPage.getVisibleTodosText();
    expect(texts).toEqual(expect.arrayContaining(todos));
  });

  test('should complete a todo and clear completed', async () => {
    await todoPage.addTodo('Complete me');
    await todoPage.completeTodoByIndex(0);
    await expect(todoPage.todoItems.first()).toHaveClass(/completed/);

    await todoPage.clearCompletedBtn.click();
    await expect(todoPage.todoItems).toHaveCount(0);
  });

  test('should persist todos after reload', async ({ page }) => {
    await todoPage.addTodo('Persistent todo');
    await page.reload();
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Persistent todo');
  });
});