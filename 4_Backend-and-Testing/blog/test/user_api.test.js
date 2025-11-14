const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const user1 = {
    username: "User1",
    name: "User One",
    password: "salainen"
}

const user2 = {
    username: "User2",
    name: "User Two",
    password: "salainen"
}

const user3 = {
    username: "User3",
    name: "User Three",
    password: "salainen"
}

beforeEach(async () => {
  await User.deleteMany({})
  let userObject = new User(user1)
  await userObject.save()
  userObject = new User(user2)
  await userObject.save()
})

test('users are returned as json', async () => {
  const response = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
  assert.strictEqual(response.body.length, 2)
})

test('users creation successfull', async () => {
  await api
    .post('/api/users')
    .send(user3)
    .expect(201)
    
  const response = await api.get('/api/users')
  const contents = response.body.map(r => r.username) 
  assert(contents.includes(user3.username)) 
  assert.strictEqual(response.body.length, 3)
})

test('users creation unsuccessfull - short username and not username', async () => {
  let user =  {
    username: "mm",
    name: "User Three",
    password: "salainen"
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(400)

  user.username = ''  
  await api
    .post('/api/users')
    .send(user)
    .expect(400)

  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, 2)
})

test('users creation unsuccessfull - short password and not password', async () => {
  let user =  {
    username: "Username",
    name: "User Three",
    password: "aa"
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(400)

  user.password = ''  
  await api
    .post('/api/users')
    .send(user)
    .expect(400)

  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, 2)
})

test('users creation unsuccessfull - repetitive username', async () => {
  await api
    .post('/api/users')
    .send(user1)
    .expect(400)

  const response = await api.get('/api/users')
  assert.strictEqual(response.body.length, 2)
})

after(async () => {
  await mongoose.connection.close()
})