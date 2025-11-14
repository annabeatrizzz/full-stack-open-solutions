import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    case 'ADD_BLOG':
      return [...state, action.payload]
    case 'LIKE':
      const updated = action.payload 
      return state.map(blog => blog.id !== updated.id ? blog : updated) 
    case 'DELETE_BLOG':
      const deleted = action.payload 
      return state.filter(blog => blog.id !== deleted.id) 
    default:
      return state
  }
}

export default blogReducer

export const setBlogs = (blogs) => {
    return {
        type: 'SET_BLOGS',
        payload: blogs,
    }
}

export const addBlog = (blog) => {
    return {
        type: 'ADD_BLOG',
        payload: blog,
    }
}

export const like = (blog) => {
    return {
        type: 'LIKE',
        payload: blog
    }
}

export const deleteB = (blog) => {
    return {
        type: 'DELETE_BLOG',
        payload: blog
    }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = (content) => {
  return async (dispatch) => {
    const updatedBlog = {
        ...content,
        likes: content.likes + 1
    }
    const returned = await blogService.update(content.id, updatedBlog)
    dispatch(like(returned))
  }
}

export const deleteBlogReducer = (content) => {
  return async (dispatch) => {
    await blogService.deleteBlog(content.id)
    dispatch(deleteB(content))
  }
}
