import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT': 
      return null
    default:
      return state
  }
}

export default userReducer

export const setUser = (user) => {
    return {
        type: 'LOGIN',
        payload: user,
    }
}

export const unsetUser = () => {
    return {
        type: 'LOGOUT',
    }
}

export const login = ({username, password}) => {
  return async (dispatch) => {
    const user = await loginService.login({username, password})
    dispatch(setUser(user))
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
  }
}
