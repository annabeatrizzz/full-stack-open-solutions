import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../service/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    createVote(state, action) {
      const updated = action.payload
      return state.map(anecdote => anecdote.id !== updated.id ? anecdote : updated)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  },
})

const { createAnecdote, setAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdote))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(anecdoteSlice.actions.createAnecdote(newAnecdote))
  }
}

export const addVoteToAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.vote(anecdote)
    dispatch(anecdoteSlice.actions.createVote(newAnecdote))
  }
}

export const { createVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer