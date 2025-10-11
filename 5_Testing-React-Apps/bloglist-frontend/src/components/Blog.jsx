import Togglable from './Togglable.jsx'

const Blog = ({ blog, addLike }) => (
  <div className="blog-card">
    <div className="blog-header">
      <p>Title = <strong>{blog.title}</strong> <span className="blog-author">Author = {blog.author}</span> </p>
    </div>
    <Togglable buttonLabel="View details">
      <span className="blog-author">Created by = {blog.user.username} URL = {blog.url} Likes = {blog.likes} </span> 
      <button onClick={() => addLike(blog)}>Like</button>
    </Togglable>
  </div>
)

export default Blog