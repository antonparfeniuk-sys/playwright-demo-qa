class TodoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async open() {
    await this.page.goto('/todomvc/');
  }

  async addTodo(text) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(todoList) {
    for (const todo of todoList) {
      await this.addTodo(todo);
    }
  }

  async completeTodo(index = 0) {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async clearCompleted() {
    await this.clearCompletedButton.click();
  }

  async getTodosCount() {
    return this.todoItems.count();
  }

  async getTodosTexts() {
    return this.todoItems.allTextContents();
  }
}

module.exports = { TodoPage };