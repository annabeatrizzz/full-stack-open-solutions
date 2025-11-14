import { useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { Link, Routes, Route } from 'react-router-dom'
import Notification from './components/Notification.jsx'
import LoginPage from './components/LoginPage'
import BlogsPage from './components/BlogsPage'
import BlogDetails from './components/BlogDetails'
import UsersPage from './components/UsersPage'
import UserDetails from './components/UserDetails'


const App = () => {
  const time = 5000
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const message = useSelector(state => state.message)

  return (
    <div className="container">
      <Notification type={message.type} message={message.content} />
      <Navbar collapseOnSelect expand="lg" bg="light" variant="primary">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link to="/">Home</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to="/blogs">Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to="/users">Users</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<LoginPage time={time} />} />
        <Route path="/blogs" element={<BlogsPage blogs={blogs} user={user} time={time} />} />
        <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} user={user} time={time} />} />
        <Route path="/users" element={<UsersPage users={users} />} />
        <Route path="/users/:id" element={<UserDetails users={users} />} />
      </Routes>
    </div>
  )
}

export default App
