import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import messageReducer from './reducers/messageReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
    message: messageReducer
  }
})

export default store