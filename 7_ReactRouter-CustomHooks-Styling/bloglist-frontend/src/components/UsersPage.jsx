import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { initalizeUsers } from '../reducers/usersReducer'

const UsersPage = ({users}) => {
  const dispatch = useDispatch()

   useEffect(() => {
      dispatch(initalizeUsers())
  }, [dispatch])
  
  console.log(users)
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs created:</th>
          </tr>
        </thead>
        <tbody>
           {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    )
}

export default UsersPage
