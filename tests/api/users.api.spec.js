const { test, expect } = require('@playwright/test');

test.describe('JSONPlaceholder API', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  test('GET /users  should return 10 users', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users).toHaveLength(10);

    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('email');
    expect(firstUser).toHaveProperty('address.city');
    expect(firstUser.email).toMatch(/@/);
  });

  test('GET /users/1  single resource', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/1`);
    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.name).toBe('Leanne Graham');
  });

  test('POST /posts  create resource', async ({ request }) => {
    const payload = {
      title: 'QA Automation Demo',
      body: 'Created during interview preparation',
      userId: 1,
    };

    const response = await request.post(`${baseURL}/posts`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created).toMatchObject(payload);
    expect(created).toHaveProperty('id');
  });

  test('GET /posts larger dataset', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts`);
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(50);

    const user1Posts = posts.filter((p) => p.userId === 1);
    expect(user1Posts.length).toBeGreaterThan(0);

    for (const post of posts.slice(0, 20)) {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
    }
  });

  test('GET non-existent  404', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/99999`);
    expect(response.status()).toBe(404);
  });
});