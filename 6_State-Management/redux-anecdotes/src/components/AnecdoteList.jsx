import { useDispatch, useSelector } from 'react-redux'
import { addVoteToAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)

    console.log(anecdotes)
    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    const vote = anecdote => {
        console.log('vote', anecdote)
        dispatch(addVoteToAnecdote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5000))
    }

    return (
    <div>
        {[...filteredAnecdotes]
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
         ))}
    </div>
    )
}

export default AnecdoteList
