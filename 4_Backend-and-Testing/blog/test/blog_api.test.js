const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(listHelper.listWithManyBlogs[0])
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
  await api
    .post('/api/blogs')
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
  const blog = {
    title: "New blog",
    author: "Author 1",
    url: "http://www.author_blog.com",
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
  
  const response = await api
    .get('/api/blogs')
    .expect(200)

  console.log(response.body)
  assert.strictEqual(response.body.length, 3)
  assert.strictEqual(response.body[2].likes, 0) 
})

after(async () => {
  await mongoose.connection.close()
})