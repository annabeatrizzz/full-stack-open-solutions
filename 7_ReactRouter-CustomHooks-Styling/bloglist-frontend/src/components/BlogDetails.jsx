import { useParams } from 'react-router-dom'
import { Button, ListGroup } from 'react-bootstrap'

import CommentForm from './CommentForm.jsx'

const BlogDetails = ({ blogs, addLike, deleteBlog, currentUser }) => {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  console.log(blog.comments)

  return (
  <div className="m-2 p-4 bg-light rounded shadow-sm">
      <p>
        Title = <strong>{blog.title}</strong>
      </p>
      <p>
        Author = {blog.author}
      </p>
      <p>
        Created by = {blog.user.username} 
      </p>
      <p>
        URL = {blog.url}
      </p>
      <p>
        Likes = {blog.likes}
      </p>

      <ListGroup>
        {blog.comments.map((comment, i) => (
          <ListGroup.Item variant='dark' key={i}>
            {comment.content}
          </ListGroup.Item>
        ))}
      </ListGroup>
      
      <Button onClick={() => addLike(blog)}>Like</Button>
      {currentUser?.username === blog.user.username && (
        <Button onClick={() => deleteBlog(blog)}>Delete</Button>
      )}

      <CommentForm className="m-2"></CommentForm>
  </div>
)}

export default BlogDetails
