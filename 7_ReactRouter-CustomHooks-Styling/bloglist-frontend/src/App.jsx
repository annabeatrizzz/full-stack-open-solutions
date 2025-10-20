import { initializeBlogs, appendBlog, likeBlog, deleteBlogReducer } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable.jsx'
import Notification from './components/Notification.jsx'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const time = 5000
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.message)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      dispatch({ type: 'ADD_MESSAGE', payload: {content: 'Wrong credentials', class: 'error'}})
      setTimeout(() => {
        dispatch({type: 'CLEAR'})
      }, time)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser', JSON.stringify(user))
    setUser(null)
    dispatch({ type: 'ADD_MESSAGE', payload: {content: 'Successfully loged out', class: 'succcess'}})
    setTimeout(() => {
        dispatch({type: 'CLEAR'})
    }, time)
  }

  const createBlog = async (blogObject) => {
    try {
      dispatch(appendBlog(blogObject))
      dispatch({ type: 'ADD_MESSAGE', payload: {content: 'Successfully added a blog', class: 'succcess'}})
      setTimeout(() => {
          dispatch({type: 'CLEAR'})
      }, time)
    } catch (error) {
      dispatch({ type: 'ADD_MESSAGE', payload: {content: `Error creating a ${error}`, class: 'error'}})
      setTimeout(() => {
          dispatch({type: 'CLEAR'})
      }, time)
    }
  }

  const addLike = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      dispatch(likeBlog(blog))
      dispatch({ type: 'ADD_MESSAGE', payload: {content: 'Successfully added a like', class: 'success'}})
      setTimeout(() => {
          dispatch({type: 'CLEAR'})
      }, time)
    } catch (error) {
      dispatch({ type: 'ADD_MESSAGE', payload: {content: `Error adding a like ${error}`, class: 'error'}})
      setTimeout(() => {
          dispatch({type: 'CLEAR'})
      }, time)
    }
  }

  const deleteBlog = async (blog) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    )
    if (!confirmDelete) {
      return
    }

    try {
      dispatch(deleteBlogReducer(blog))
      dispatch({ type: 'ADD_MESSAGE', payload: {content: 'Successfully deleted a blog', class: 'success'}})
      setTimeout(() => {
          dispatch({type: 'CLEAR'})
      }, time)
    } catch (error) {
      dispatch({ type: 'ADD_MESSAGE', payload: {content: `Error deleting the blog ${error}`, class: 'error'}})
      setTimeout(() => {
          dispatch({type: 'CLEAR'})
      }, time)
    }
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
        <Notification type={message.tyoe} message={message.content}></Notification>
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
        <Notification type={message.type} message={message.content}></Notification>

        <h2>Blogs</h2>
        <Togglable buttonLabel="Create new blog">
          <BlogForm createBlog={createBlog}></BlogForm>
        </Togglable>

        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              deleteBlog={deleteBlog}
              currentUser={user}
            />
          ))}

        <button onClick={handleLogout}>Log off</button>
      </div>
    )
  }
}

export default App
