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

    test('should check if the unique identifier for a blog is named "id"', async () => {
        const blogsResponse = await testApp.get('/api/blogs/');
        const blogs = blogsResponse.body;
        expect(blogs[0].id).toBeDefined();
    });

    test('should ensure a blog gets saved in the database', async () => {
        const newBlog = { title: "Angular patterns", author: "Jackie Chan", url: "https://angularpatterns.com/", likes: 1 };
        const postResponse = await testApp.post('/api/blogs/').send(newBlog);
        expect(postResponse.body).toMatchObject(newBlog);
    });

    test('should ensure the default likes for a blog is 0', async () => {
        const newBlog = { title: "Angular patterns", author: "Jackie Chan", url: "https://angularpatterns.com/" };
        const postResponse = await testApp.post('/api/blogs/').send(newBlog);
        expect(postResponse.body.likes).toBe(0);
    });
})

afterAll(() => {
    mongoose.connection.close();
})