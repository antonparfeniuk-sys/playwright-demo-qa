const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { TodoPage } = require('../../pages/TodoPage');

// Читаємо дані з CSV
const csvPath = path.join(__dirname, '../../data/todos.csv');
const records = parse(fs.readFileSync(csvPath), {
  columns: true,
  skip_empty_lines: true
});

test.describe('Tests from CSV file', () => {
  for (const row of records) {
    test(`should add todo from CSV: ${row.title}`, async ({ page }) => {
      const todoPage = new TodoPage(page);
      await todoPage.open();

      await todoPage.addTodo(row.title);

      await expect(todoPage.todoItems).toHaveCount(1);
      await expect(todoPage.todoItems.first()).toContainText(row.title);
    });
  }
});