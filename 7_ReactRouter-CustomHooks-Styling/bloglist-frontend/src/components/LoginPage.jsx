import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const LoginPage = ({time}) => { 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(login({username, password}))
    } catch {
      dispatch({ type: 'ADD_MESSAGE', payload: {content: 'Wrong credentials', class: 'error'}})
      setTimeout(() => {
        dispatch({type: 'CLEAR'})
      }, time)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form className="p-4 bg-light rounded shadow-sm" onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div><br></br>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div><br></br>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  )
}

export default LoginPage
