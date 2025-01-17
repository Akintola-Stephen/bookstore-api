import request from 'supertest';
import app from '../app';
import Book from '../models/bookModel';


beforeEach(async () => {
    await Book.deleteMany({}); // Clear books collection (if using MongoDB)
});

describe('Books API', () => {

    // Test the POST route for creating a new book
    it('should create a new book', async () => {
        const bookData = {
            title: 'Zynthexa Innovations History',
            author: 'Akintola Stephen',
            category: 'History',
            publicationYear: 2024,
            isbn: '9780743273565',
        };

        const response = await request(app)
            .post('/api/books')
            .send(bookData)
            .expect(201); // Expect a 201 created status

        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.title).toBe(bookData.title);
        expect(response.body.data.author).toBe(bookData.author);
    });

    // Test the GET route for getting a book by ID
    it('should return a book by ID', async () => {
        const bookData = {
            title: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            category: 'Fiction',
            publicationYear: 1960,
            isbn: '9780061120084',
        };

        // Create a book
        const createResponse = await request(app)
            .post('/api/books')
            .send(bookData)
            .expect(201);

        const bookId = createResponse.body.data._id;

        // Get the book by ID
        const response = await request(app)
            .get(`/api/books/${bookId}`)
            .expect(200); // Expect a 200 OK status

        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('_id', bookId);
        expect(response.body.data.title).toBe(bookData.title);
        expect(response.body.data.author).toBe(bookData.author);
    });

});
