import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to Anecdotes',
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  console.log(message, time)
  return (dispatch) => {
    dispatch(addNotification(message))
    setTimeout(() => {
    dispatch(removeNotification())
    }, time)
  }
}

export default notificationSlice.reducer