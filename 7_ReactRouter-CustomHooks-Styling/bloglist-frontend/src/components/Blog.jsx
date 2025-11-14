import { Link } from 'react-router-dom'

const Blog = ({ blog }) => (
  <div className="blog-card">
    <div className="blog-header">
      <p>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </p>
    </div>
  </div>
)

export default Blog
