import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm> test', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}></BlogForm>)

  const inputTitle = screen.getByPlaceholderText('write blog title')
  const inputAuthor = screen.getByPlaceholderText('write blog author')
  const inputUrl = screen.getByPlaceholderText('write blog url')
  const inputLikes = screen.getByLabelText('Likes')
  const createButton = screen.getByText('Save')

  await user.type(inputTitle, 'My Title')
  await user.type(inputAuthor, 'Author Name')
  await user.type(inputUrl, 'www.blog1.com')
  await user.type(inputLikes, '10')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'My Title',
    author: 'Author Name',
    url: 'www.blog1.com',
    likes: 10
  })
})