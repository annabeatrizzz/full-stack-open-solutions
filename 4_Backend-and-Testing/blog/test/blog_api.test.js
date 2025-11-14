const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

const user1 = {
    username: "User1",
    name: "User One",
    password: "password"
} 

beforeEach(async () => {
  const passwordHash = await bcrypt.hash(user1.password, 10)

  await User.deleteMany({})
  let userObject = new User(
    {username: user1.username,
    name: user1.name,
    passwordHash}
  )
  await userObject.save()
  await Blog.deleteMany({})
  let blogObject = new Blog({
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: userObject._id,
    likes: 7,
  })
  await blogObject.save()
  blogObject = new Blog(listHelper.listWithManyBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  assert.strictEqual(response.body.length, 2)
})

test('blogs unique identifier is named id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  assert.strictEqual(response.body[0].id, '5a422a851b54a676234d17f7')
})

test('new blogs are correctly created', async () => {
  const login = await api
    .post('/api/login')
    .send({username: user1.username, password: user1.password})
    .expect(200)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .send(listHelper.listWithManyBlogs[2])
    .expect(201)
  
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  assert.strictEqual(response.body.length, 3)
  assert.strictEqual(response.body[2].title, listHelper.listWithManyBlogs[2].title)
  assert.strictEqual(response.body[2].author, listHelper.listWithManyBlogs[2].author)
  assert.strictEqual(response.body[2].url, listHelper.listWithManyBlogs[2].url)
  assert.strictEqual(response.body[2].likes, listHelper.listWithManyBlogs[2].likes)
})

test('blogs without number of likes', async () => {
  const login = await api
    .post('/api/login')
    .send({username: user1.username, password: user1.password})
    .expect(200)

  const blog = {
    title: "New blog",
    author: "Author 1",
    url: "http://www.author_blog.com",
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .send(blog)
    .expect(201)
  
  const response = await api
    .get('/api/blogs')
    .expect(200)

  assert.strictEqual(response.body.length, 3)
  assert.strictEqual(response.body[2].likes, 0) 
})

test('blogs without title are not created', async () => {
  const login = await api
    .post('/api/login')
    .send({username: user1.username, password: user1.password})
    .expect(200)

  const blog = {
    author: "Author 1",
    url: "http://www.author_blog.com",
    likes: 1
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .send(blog)
    .expect(400)
  
  const response = await api
    .get('/api/blogs')
    .expect(200)

  assert.strictEqual(response.body.length, 2)
})

test('blogs without url are not created', async () => {
  const login = await api
    .post('/api/login')
    .send({username: user1.username, password: user1.password})
    .expect(200)

  const blog = {
    title: "My title",
    author: "Author 1",
    likes: 1
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .send(blog)
    .expect(400)
  
  const response = await api
    .get('/api/blogs')
    .expect(200)

  assert.strictEqual(response.body.length, 2)
})

test('blogs delete operation successfull', async () => {
   const login = await api
    .post('/api/login')
    .send({username: user1.username, password: user1.password})
    .expect(200)

  const blogs = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .expect(200)

  const blogToDelete = blogs.body[0]

  console.log(blogToDelete)
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${login.body.token}`)
    .expect(204)

  const blogsUpdated = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .expect(200)

  const titles = blogsUpdated.body.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsUpdated.body.length, 1)
})

test('blogs update number of likes', async () => {
   const login = await api
    .post('/api/login')
    .send({username: user1.username, password: user1.password})
    .expect(200)

  const blogs = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .expect(200)

  const blogToUpdate = blogs.body[0]
  blogToUpdate.likes = 30

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `Bearer ${login.body.token}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsUpdated = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${login.body.token}`)
    .expect(200)

  assert.strictEqual(blogsUpdated.body.length, 2)
  assert.strictEqual(blogsUpdated.body[0].likes, 30)
})

after(async () => {
  await mongoose.connection.close()
})