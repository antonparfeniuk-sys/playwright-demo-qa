const { test, expect } = require('@playwright/test');

test.describe('JSONPlaceholder API', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  test('GET /users returns list of 10 users', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const users = await response.json();

    expect(users).toHaveLength(10);
    expect(users[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.stringMatching(/@/),
        address: expect.objectContaining({
          city: expect.any(String),
        }),
      })
    );
  });

  test('GET /users/1 returns correct user', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/1`);

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.name).toBe('Leanne Graham');
  });

  test('POST /posts creates a new post', async ({ request }) => {
    const payload = {
      title: 'QA Automation Demo',
      body: 'Created by Playwright API test',
      userId: 1,
    };

    const response = await request.post(`${baseURL}/posts`, {
      data: payload,
    });

    expect(response.status()).toBe(201);

    const createdPost = await response.json();
    expect(createdPost).toMatchObject(payload);
    expect(createdPost.id).toBeDefined();
  });

  test('GET /posts returns large list of posts', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts`);
    const posts = await response.json();

    expect(response.status()).toBe(200);
    expect(posts.length).toBeGreaterThan(50);

    
    for (const post of posts.slice(0, 5)) {
      expect(post).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          body: expect.any(String),
          userId: expect.any(Number),
        })
      );
    }
  });

  test('GET non-existing user returns 404', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/99999`);
    expect(response.status()).toBe(404);
  });
});