import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification.jsx'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
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

  const handleBlog = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value
    })
  }

  const addBlog = async event => {
    event.preventDefault()

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({ title: '', author: '', url: '', likes: 0 })
      setMessage(`Successfully added a blog`)
      setMessageType('success')
    } catch (error) {
      setMessage(`Error creating a blog ${error}`)
      setMessageType('error')
    }
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label>Title: </label>
      <input name="title" value={newBlog.title} onChange={handleBlog}/><br></br>
      <label>Author: </label>
      <input name="author" value={newBlog.author} onChange={handleBlog}/><br></br>
      <label>Url: </label>
      <input name="url" value={newBlog.url} onChange={handleBlog}/><br></br>
      <label>Likes: </label>
      <input name="likes" value={newBlog.likes} onChange={handleBlog}/><br></br>
      <button type="submit">Save</button>
    </form>
  )

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
          <button type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
         <Notification type={messageType} message={message}></Notification>
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

        <h2>New blog</h2>
         {blogForm()}

        <button onClick={handleLogout}>log off</button>
      </div>
    )
  }

}

export default App