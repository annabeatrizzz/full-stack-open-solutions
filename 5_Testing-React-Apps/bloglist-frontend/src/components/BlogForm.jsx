const BlogForm = ({ addBlog, newBlog, handleBlog }) => (
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

export default BlogForm