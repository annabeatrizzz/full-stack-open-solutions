import { useSelector } from 'react-redux'

import store from './store'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const message = useSelector(state => state.message)

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
