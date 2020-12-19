const app = require("../app");
const supertest = require("supertest")
const Blog = require("../models/blog");
const mongoose = require("mongoose");

const testApp = supertest(app);

const INITIAL_BLOGS = [{ title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 }, { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5 }]

beforeEach(async () => {
    /* deleting all blogs */
    await Blog.deleteMany();

    /* adding two blogs */
    return await Promise.all([
        new Blog(INITIAL_BLOGS[0]).save(),
        new Blog(INITIAL_BLOGS[1]).save()
    ])
}, 10000)

describe('should test if the CRUD APIs work properly', () => {
    test('should return the actual count of blogs', async () => {
        const blogsResponse = await testApp.get('/api/blogs/');
        expect(blogsResponse.body.length).toEqual(INITIAL_BLOGS.length);
    });
})

afterAll(() => {
    mongoose.connection.close();
})