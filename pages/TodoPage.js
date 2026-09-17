class TodoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.todoCount = page.getByTestId('todo-count');
    this.clearCompletedBtn = page.getByRole('button', { name: 'Clear completed' });
    this.toggleAll = page.getByLabel('Mark all as complete');
  }

  async goto() {
    await this.page.goto('/todomvc/');
  }

  async addTodo(text) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(texts) {
    for (const text of texts) {
      await this.addTodo(text);
    }
  }

  async getTodoCount() {
    return this.todoItems.count();
  }

  async completeTodoByIndex(index) {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async getVisibleTodosText() {
    return this.todoItems.allTextContents();
  }
}

module.exports = { TodoPage };