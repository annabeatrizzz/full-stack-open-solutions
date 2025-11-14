const { test, expect, beforeEach, afterAll, describe } = require('@playwright/test')

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

   afterAll(async ({ request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
        await page.getByLabel('username').fill('aaa')
        await page.getByLabel('password').fill('salainen')
        await page.getByRole('button', { name: 'Login' }).click() 

        await page.getByRole('heading', { name: 'Blogs' }).waitFor({ state: 'visible' })
    })

    test('a new blog can be created', async ({ page }) => {
        await page.reload()
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByLabel('Title').fill('New Title')
        await page.getByLabel('Author').fill('Author Name')
        await page.getByLabel('Url').fill('www.blog.com')
        await page.getByLabel('Likes').fill('10')
        await page.getByRole('button', { name: 'Save' }).click()

        const blogCard = page.locator('.blog-card', { hasText: 'New Title' })
    })

    test('a blog can be liked', async ({ page }) => {
        const blogCard = page.locator('.blog-card', { hasText: 'New Title' })
        
        await page.getByRole('button', { name: 'View details' }).click()
        await page.getByRole('button', { name: 'Like' }).click()
        await expect(page.getByText('Likes = 11', { exact: false })).toBeVisible()
    })

    test('a blog can be deleted by the user', async ({ page }) => {
        const blogCard = page.locator('.blog-card', { hasText: 'New Title' })
 
        await page.getByRole('button', { name: 'View details' }).click()
        page.once('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'Delete' }).click()

        await page.reload()
        await expect(page.getByText('Title = New Title', { exact: false })).not.toBeVisible()
        await expect(page.getByText('Author = Author Name', { exact: false })).not.toBeVisible()    
    })

    test('a blog can not see the delete buton if it is not the creator of the blog', async ({ page }) => {
        await page.getByRole('button', { name: 'Log off' }).click() 

        await page.getByLabel('username').fill('user1')
        await page.getByLabel('password').fill('password')
        await page.getByRole('button', { name: 'Login' }).click() 

        await page.getByRole('heading', { name: 'Blogs' }).waitFor({ state: 'visible' })

        await page.getByRole('button', { name: 'View details' }).click()
        const deleteButton = page.getByRole('button', { name: 'Delete' })
        await expect(deleteButton).toHaveCount(0)
    })

    test('ensure the blogs are organized according to the most liked blog', async ({ page }) => {
        await page.reload()
        
        await page.getByRole('button', { name: 'Create new blog' }).click()
        await page.getByLabel('Title').fill('New Title2')
        await page.getByLabel('Author').fill('Author Name2')
        await page.getByLabel('Url').fill('www.blog2.com')
        await page.getByLabel('Likes').fill('30')
        await page.getByRole('button', { name: 'Save' }).click()

        //const firstBlog = page.locator('.blog-card').first()
        //const secondBlog = page.locator('.blog-card').nth(1)

        const newBlog = page.locator('.blog-card', { hasText: 'New Title2' })
        const oldBlog = page.locator('.blog-card', { hasText: 'New Title' })

        // Expand details
        await newBlog.getByRole('button', { name: 'View details' }).click()
        await oldBlog.getByRole('button', { name: 'View details' }).click()

        // Assert likes
        await expect(newBlog.locator('span', { hasText: 'Likes = 30' })).toBeVisible()
        await expect(oldBlog.locator('span', { hasText: 'Likes = 11' })).toBeVisible()
    })
  })
})