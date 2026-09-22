const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../../pages/TodoPage');

test.describe('TodoMVC – Web E2E', () => {
  /** @type {TodoPage} */
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.open();
  });

  test('User can add a single todo', async () => {
    await todoPage.addTodo('Buy milk');

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Buy milk');
  });

  test('User can add multiple todos', async () => {
    const todos = [
      'Prepare test data',
      'Write API tests',
      'Setup CI pipeline',
      'Review regression suite',
    ];

    await todoPage.addTodos(todos);

    await expect(todoPage.todoItems).toHaveCount(todos.length);
    await expect(await todoPage.getTodosTexts()).toEqual(expect.arrayContaining(todos));
  });

  test('User can complete a todo and clear completed items', async () => {
    await todoPage.addTodo('Complete this task');
    await todoPage.completeTodo(0);

    await expect(todoPage.todoItems.first()).toHaveClass(/completed/);

    await todoPage.clearCompleted();
    await expect(todoPage.todoItems).toHaveCount(0);
  });

  test('Todos persist after page reload', async ({ page }) => {
    await todoPage.addTodo('Persistent todo');
    await page.reload();

    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems.first()).toContainText('Persistent todo');
  });
});