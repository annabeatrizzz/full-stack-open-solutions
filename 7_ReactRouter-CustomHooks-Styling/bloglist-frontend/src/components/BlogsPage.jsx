import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable.jsx'

import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { unsetUser } from '../reducers/userReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { appendBlog, likeBlog, deleteBlogReducer } from '../reducers/blogReducer'

const BlogsPage = ({blogs, user, time}) => { 
  const dispatch = useDispatch()

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser', JSON.stringify(user))
    dispatch(unsetUser())
    dispatch({ type: 'ADD_MESSAGE', payload: {content: 'Successfully loged out', class: 'succcess'}})
    setTimeout(() => {
        dispatch({type: 'CLEAR'})
    }, time)
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user)) 
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
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

      <Button variant="secondary" onClick={handleLogout}>Log off</Button>
    </div>
  )
}

export default BlogsPage
