import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    case 'ADD_BLOG':
      return [...state, action.payload]
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

