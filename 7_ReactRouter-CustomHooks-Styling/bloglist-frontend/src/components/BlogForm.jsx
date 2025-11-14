import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  })

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: Number(newBlog.likes),
    }

    createBlog(blogObject)
    setNewBlog({ title: '', author: '', url: '', likes: 0 })
  }

  const handleBlog = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value,
    })
  }

  return (
    <div>
      <h2>New blog</h2>

      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label htmlFor="title">Title</Form.Label>
          <input
            id="title"
            name="title"
            placeholder="write blog title"
            value={newBlog.title}
            onChange={handleBlog}
          />
          <br></br>
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="author">Author</Form.Label>
          <input
            id="author"
            name="author"
            placeholder="write blog author"
            value={newBlog.author}
            onChange={handleBlog}
          />
          <br></br>
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="likes">Likes</Form.Label>
          <input
            id="likes"
            name="likes"
            value={newBlog.likes}
            onChange={handleBlog}
          />
          <br></br>
        </Form.Group>

        <Button type="submit">Save</Button>
      </Form>
    </div>
  )
}

export default BlogForm
