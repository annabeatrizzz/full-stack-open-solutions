import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable.jsx'
import Notification from './components/Notification.jsx'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setMessage('Wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    setUser(null)
    setMessage('Successfully loged out')
    setMessageType('success')
  }

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage('Successfully added a blog')
      setMessageType('success')
    } catch (error) {
      setMessage(`Error creating a blog ${error}`)
      setMessageType('error')
    }
  }

  const addLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
      setMessage('Successfully added a like')
      setMessageType('success')
    } catch (error) {
      setMessage(`Error adding a like ${error}`)
      setMessageType('error')
    }
  }

  const deleteNote = async (blog) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${blog.title}"?`)
    if (!confirmDelete) {
      return
    }

    try {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setMessage('Successfully deleted blog')
      setMessageType('success')
    } catch (error) {
      setMessage(`Error deleting the blog ${error}`)
      setMessageType('error')
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notification type={messageType} message={message}></Notification>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <Notification type={messageType} message={message}></Notification>

        <h2>Blogs</h2>
        <Togglable buttonLabel='Create new blog'>
          <BlogForm createBlog={createBlog}></BlogForm>
        </Togglable>

        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} deleteNote={deleteNote} currentUser={user}/>
          )}

        <button onClick={handleLogout}>Log off</button>
      </div>
    )
  }

}

export default App