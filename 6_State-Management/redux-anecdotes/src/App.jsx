import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter></Filter> 
      <AnecdoteList></AnecdoteList>   
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App
