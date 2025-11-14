import { Alert} from 'react-bootstrap'

const Notification = ({ type, message }) => {
  if (message === '') {
    return null
  }

  return <Alert className={type}>{message}</Alert>
}

export default Notification
