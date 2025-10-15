import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to Anecdotes',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer