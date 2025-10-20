import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: messageReducer
  }
})

export default store