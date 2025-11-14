const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listHelper.listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has more than one blog', () => {
    const result = listHelper.totalLikes(listHelper.listWithManyBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, the favorite is itself', () => {
    const result = listHelper.favoriteBlog(listHelper.listWithOneBlog)
    assert.deepStrictEqual(result, listHelper.listWithOneBlog[0])
  })

  test('when list has more than one blog', () => {
    const result = listHelper.favoriteBlog(listHelper.listWithManyBlogs)
    assert.strictEqual(result, listHelper.listWithManyBlogs[2])
  })
})

describe('most blogs', () => {
  test('when list has only one blog, the author with most blog will be himself', () => {
    const result = listHelper.mostBlogs(listHelper.listWithOneBlog)
    assert.deepStrictEqual(result, { 
      author: listHelper.listWithOneBlog[0].author,
      blogs: 1 
    })
  })

  test('when list has more than one blog', () => {
    const result = listHelper.mostBlogs(listHelper.listWithManyBlogs)
    assert.deepStrictEqual(result,  { 
      author: 'Robert C. Martin',
      blogs: 3 
    })
  })
})

describe('most likes', () => {
  test('when list has only one blog, the author with most blog will be himself', () => {
    const result = listHelper.mostLikes(listHelper.listWithOneBlog)
    assert.deepStrictEqual(result, { 
      author: listHelper.listWithOneBlog[0].author,
      likes: listHelper.listWithOneBlog[0].likes
    })
  })

  test('when list has more than one blog', () => {
    const result = listHelper.mostLikes(listHelper.listWithManyBlogs)
    assert.deepStrictEqual(result,  { 
      author: 'Edsger W. Dijkstra',
      likes: 17 
    })
  })
})