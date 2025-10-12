import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

  const addBlog = async event => {
    event.preventDefault()

    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: Number(newBlog.likes)
    }

    createBlog(blogObject)
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
        <label htmlFor="title">Title</label>
        <input id="title" name="title" placeholder='write blog title' value={newBlog.title} onChange={handleBlog}/><br></br>

        <label htmlFor="author">Author</label>
        <input id="author" name="author" placeholder='write blog author' value={newBlog.author} onChange={handleBlog}/><br></br>

        <label htmlFor="url">Url</label>
        <input id="url" name="url" placeholder='write blog url' value={newBlog.url} onChange={handleBlog}/><br></br>

        <label htmlFor="likes">Likes</label>
        <input id="likes" name="likes" value={newBlog.likes} onChange={handleBlog}/><br></br>

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default BlogForm