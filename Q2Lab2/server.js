const express = require('express');
const sql = require('mssql');

const app = express();
const PORT = 8888;

app.use(express.json());

// SQL Server config
const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost\\TUNGLE',  // or '127.0.0.1'
    port: 1433,
    database: 'Lab2',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

// Create a connection pool
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

// Check connection
poolConnect
    .then(() => console.log('Connected to SQL Server'))
    .catch(err => console.error('Database connection failed:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Hello from Node.js API connected to SQL Server!');
});

// Get all books
app.get('/api/books', async (req, res) => {
    try {
        await poolConnect; // ensure connection
        const result = await pool.request().query('SELECT * FROM dbo.Book');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Error fetching books' });
    }
});
// Add a new book
app.post('/api/books', async (req, res) => {
    try {
        await poolConnect;
        const { title, author, price } = req.body;

        if (!title || !author || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const result = await pool.request()
            .input('title', sql.NVarChar, title)
            .input('author', sql.NVarChar, author)
            .input('price', sql.Float, price)
            .query(`
        INSERT INTO dbo.Book (Title, Author, Price)
        VALUES (@title, @author, @price)
      `);

        res.status(201).json({ message: 'Book added successfully' });
    } catch (err) {
        console.error('Error adding book:', err);
        res.status(500).json({ message: 'Error adding book' });
    }
});

// Get book by ID
app.get('/api/books/:id', async (req, res) => {
    try {
        await poolConnect;
        const { id } = req.params;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM dbo.Book WHERE Id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Error fetching book by ID:', err);
        res.status(500).json({ message: 'Error fetching book by ID' });
    }
});

// Update book by ID
app.put('/api/books/:id', async (req, res) => {
    try {
        await poolConnect;
        const { id } = req.params;
        const { title, author, price } = req.body;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('title', sql.NVarChar, title)
            .input('author', sql.NVarChar, author)
            .input('price', sql.Float, price)
            .query(`
        UPDATE dbo.Book
        SET Title = @title, Author = @author, Price = @price
        WHERE Id = @id
      `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book updated successfully' });
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ message: 'Error updating book' });
    }
});

// Delete book by ID
app.delete('/api/books/:id', async (req, res) => {
    try {
        await poolConnect;
        const { id } = req.params;

        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM dbo.Book WHERE Id = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error('Error deleting book:', err);
        res.status(500).json({ message: 'Error deleting book' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
