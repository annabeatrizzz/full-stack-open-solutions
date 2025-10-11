import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Renders content of blog', () => {
  const blog = {
    title: 'My title',
    author: 'AuthorName',
    url: 'www.basic.com',
    likes: 1,
    user: '123'
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('My title')
  expect(title).toBeDefined()

  const author = screen.getByText('AuthorName', { exact: false })
  expect(author).toBeDefined()
})