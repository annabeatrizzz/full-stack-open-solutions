import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload
    default:
      return state
  }
}

export default usersReducer

export const setUsers = (users) => {
    return {
        type: 'SET_USERS',
        payload: users,
    }
}

export const initalizeUsers = () => {
   return async (dispatch) => {
    const users = await userService.getAll()
    console.log(users)
    dispatch(setUsers(users))
  }
}

