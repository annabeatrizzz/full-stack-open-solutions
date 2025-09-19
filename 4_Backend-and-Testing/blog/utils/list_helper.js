const dummy = (blogs) => {
  return 1
}

const totalLikes = (blog) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blog.reduce(reducer, 0)
}

const favoriteBlog = (blog) => {
    const reducer = (maxObj, currentObj) => {
        if (currentObj.likes > maxObj.likes) {
            return currentObj            
        }
        return maxObj
    }

    return blog.reduce(reducer)
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}