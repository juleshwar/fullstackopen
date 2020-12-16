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

module.exports = {
    dummy,
    getTotalLikes,
    getFavoriteBlog
}