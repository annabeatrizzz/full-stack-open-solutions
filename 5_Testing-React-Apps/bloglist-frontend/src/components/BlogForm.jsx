import { useState } from 'react'
const BlogForm = ({ createNote }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

  const addBlog = async event => {
    event.preventDefault()

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    createNote(blogObject)
    setNewBlog({ title: '', author: '', url: '', likes: 0 })
  }

  const handleBlog = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value
    })
  }

  return (
    <div>
      <h2>New blog</h2>

      <form onSubmit={addBlog}>
        <label>Title: </label>
        <input name="title" value={newBlog.title} onChange={handleBlog}/><br></br>

        <label>Author: </label>
        <input name="author" value={newBlog.author} onChange={handleBlog}/><br></br>

        <label>Url: </label>
        <input name="url" value={newBlog.url} onChange={handleBlog}/><br></br>

        <label>Likes: </label>
        <input name="likes" value={newBlog.likes} onChange={handleBlog}/><br></br>

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default BlogForm