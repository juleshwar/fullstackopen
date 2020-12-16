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

module.exports = {
    dummy,
    getTotalLikes
}