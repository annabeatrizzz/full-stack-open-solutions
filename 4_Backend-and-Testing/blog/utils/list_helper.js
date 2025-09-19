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

const mostBlogs = (blog) => {

    const reducer = (maxObj, currObj) => {
        if(currObj.blogs > maxObj.blogs){
            return currObj
        }
        return maxObj
    }

    if (blog.length === 1) {
        return {
            author: blog.name, 
            blogs: 1
        }
    }

    //step 1 - find all the authors and their respective number of posts
    const numbOfPosts = []
    blog.forEach(b => {
        const exists = numbOfPosts.find(a => a.author === b.author)
        if (exists) {
           exists.blogs += 1 
        } else {
            numbOfPosts.push({author: b.author, blogs: 1})
        }
    })

    //step 2 - check who has the biggest number of posts
    return numbOfPosts.reduce(reducer)
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}