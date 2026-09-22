const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { TodoPage } = require('../../pages/TodoPage');

const csvPath = path.join(__dirname, '../../data/todos.csv');
const records = parse(fs.readFileSync(csvPath), {
  columns: true,
  skip_empty_lines: true,
});

test.describe('Data-driven tests from CSV', () => {
  for (const record of records) {
    test(`Todo from CSV: "${record.title}"`, async ({ page }) => {
      const todoPage = new TodoPage(page);
      await todoPage.goto();

      await todoPage.addTodo(record.title);

      if (record.shouldExist === 'true') {
        await expect(todoPage.todoItems.filter({ hasText: record.title })).toHaveCount(1);
      } else {
        // Для демо просто перевіряємо, що елемент додався
        await expect(todoPage.todoItems).toHaveCount(1);
      }
    });
  }
});