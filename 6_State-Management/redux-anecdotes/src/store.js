import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './reducers/filterReducer'
import messageReducer from './reducers/messageReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    message: messageReducer
  }
})

export default store