import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import commentsService from '../services/comments'

const CommentForm = ({ }) => {

  const { id: blogId } = useParams()
  const [newComment, setNewComment] = useState('')

  const handleComment = (e) => setNewComment(e.target.value)

  const addComment = async (e) => {
    e.preventDefault()

    try {
      const created = await commentsService.create({
        content: newComment,
        blogId: blogId,
      })
      console.log(created)
      setNewComment('')
    } catch (error) {
      console.error('failed to post comment', error)
    }
  }

  return (
  <div>
      <h4>Comment</h4>
      <Form onSubmit={addComment}>
        <label htmlFor="comment">Comment</label>
        <input
          id="comment"
          name="comment"
          placeholder="write comment"
          value={newComment}
          onChange={handleComment}
        />
        <br></br>

        <Button type="submit">Add comment</Button>
      </Form>
  </div>
)}

export default CommentForm
