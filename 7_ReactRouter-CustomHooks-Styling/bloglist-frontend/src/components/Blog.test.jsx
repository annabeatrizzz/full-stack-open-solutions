import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'My title',
  author: 'AuthorName',
  url: 'www.basic.com',
  likes: 1,
  user: {
    username: 'User name',
  },
}

describe('<Blog />', () => {
  beforeEach(() => {
    render(<Blog blog={blog} />)
  })

  test('Renders content of blog', () => {
    const title = screen.getByText('My title')
    expect(title).toBeDefined()

    const author = screen.getByText('AuthorName', { exact: false })
    expect(author).toBeDefined()
  })

  test('At start the children are not displayed', () => {
    const details = screen.getByText('Created by =', { exact: false })
    expect(details).not.toBeVisible()

    const btnLike = screen.getByText('Like')
    expect(btnLike).not.toBeVisible()

    const btnDelete = screen.getByText('Delete')
    expect(btnDelete).not.toBeVisible()
  })
})

test('Button like being pressed', async () => {
  const mockHandler = vi.fn()
  render(<Blog blog={blog} addLike={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
