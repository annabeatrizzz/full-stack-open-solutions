import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

import { setAnecdote } from './reducers/anecdoteReducer'
import anecdoteService from './service/anecdote'

const App = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.message)

  useEffect(() => {
    anecdoteService.getAll().then(anecdote => dispatch(setAnecdote(anecdote)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification content={message}></Notification>
      <Filter></Filter> 
      <AnecdoteList></AnecdoteList>   
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App
