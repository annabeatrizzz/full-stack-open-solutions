import { useContext } from 'react'
import { createAnecdote } from '../requests'
import MessageContext from '../MessageContext'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const { messageDispatch } = useContext(MessageContext)
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      messageDispatch({ type: 'SET', payload: "Anecdote created" })
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      messageDispatch({ type: 'SET', payload: "Anecdote must have a length of at least 5" })
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
