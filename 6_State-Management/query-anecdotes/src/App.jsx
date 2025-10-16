import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const [message, setMessage] = useState('')

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdote'],
    queryFn: async () => {
      try {
        const response = await fetch('http://localhost:3001/anecdotes')
        if (!response.ok) {
          throw new Error('Failed to fetch anecdotes')
        }
        return await response.json()
      } catch (error) {
        setMessage('Anecdote Server not available due to problems in the server')
        throw error
      }
    }
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
    <div>
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
    </div>
  )
}

export default App
