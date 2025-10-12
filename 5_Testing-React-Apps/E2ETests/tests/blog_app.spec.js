const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'User name',
        username: 'aaa',
        password: 'salainen'
      }
    })
    
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', async () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByLabel('username').fill('aaa')
        await page.getByLabel('password').fill('salainen')

        await page.getByRole('button', { name: 'Login' }).click() 
        await expect(page.getByRole('heading', { name: 'Blogs' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByLabel('username').fill('aaa')
        await page.getByLabel('password').fill('wrong')

        await page.getByRole('button', { name: 'Login' }).click() 
        await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })
})