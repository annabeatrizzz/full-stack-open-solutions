import MessageContext from './MessageContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useReducer } from 'react'
import { getAnecdotes, updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = useQueryClient()

  const messageReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      setTimeout(() => {
        messageDispatch({ type: '' })
      }, 5000); 
      return action.payload
    default:
      return ''
    }
  }

  const [message, messageDispatch] = useReducer(messageReducer, '')
  
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      messageDispatch({ type: 'SET', payload: "Anecdote liked" })
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = async (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
 
  console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (message === 'Anecdote Server not available due to problems in the server') {
    return <Notification message={message}></Notification>
  }
 
  const anecdotes = result.data

  return (
    <MessageContext.Provider value={{ message, messageDispatch }}>
      <h3>Anecdote app</h3>

      <Notification message={message}/>
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </MessageContext.Provider>
  )
}

export default App
