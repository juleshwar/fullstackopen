const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
}

const getTotalLikes = (blogList) => {
    if (!blogList.length) {
        return 0
    }

    const likesReducer = (accumulator, next) => {
        return accumulator + next.likes;
    }
    return blogList.reduce(likesReducer, 0);
}

const getFavoriteBlog = (blogList) => {
    if (!blogList.length) {
        return null
    }

    let favoriteBlog;
    for (let i = 0; i < blogList.length; i++) {
        const blog = blogList[i];
        if (!favoriteBlog) {
            favoriteBlog = blog
            continue;
        }
        if (blog.likes > favoriteBlog.likes) {
            favoriteBlog = blog
        }
    }
    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes,
    }
}

const getAuthorWithMostBlogs = (blogList) => {
    const blogsMap = _.transform(blogList, (res, n) => {
        if (res[n.author] === undefined) {
            res[n.author] = {
                author: n.author,
                blogs: 1
            };
        } else {
            res[n.author].blogs++;
        }
    }, {})
    return _.orderBy(blogsMap, 'blogs', 'desc')[0];
}

const getAuthorWithMostLikes = (blogList) => {
    const likesMap = _.transform(blogList, (res, n) => {
        if (res[n.author] === undefined) {
            res[n.author] = {
                author: n.author,
                likes: n.likes
            };
        } else {
            res[n.author].likes = res[n.author].likes + n.likes;
        }
    }, {})
    return _.orderBy(likesMap, 'likes', 'desc')[0];
}


module.exports = {
    dummy,
    getTotalLikes,
    getFavoriteBlog,
    getAuthorWithMostBlogs,
    getAuthorWithMostLikes
}