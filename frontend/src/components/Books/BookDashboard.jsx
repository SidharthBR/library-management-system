import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './BookForm';
import BookDetails from './BookDetails';

export default function BookDashboard() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'

  // fetch books on load
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books', err);
    }
  };

  const handleAddBook = () => {
    setFormMode('add');
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleEditBook = (book) => {
    setFormMode('edit');
    setSelectedBook(book);
    setShowForm(true);
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await axios.delete(`/api/books/${bookId}`);
      setBooks(books.filter((b) => b.id !== bookId));
    } catch (err) {
      console.error('Failed to delete book', err);
    }
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setShowForm(false);
  };

  const handleFormSubmit = async (bookData) => {
    try {
      if (formMode === 'add') {
        const res = await axios.post('/api/books', bookData);
        setBooks([...books, res.data]);
      } else if (formMode === 'edit' && selectedBook) {
        const res = await axios.put(`/api/books/${selectedBook.id}`, bookData);
        setBooks(books.map((b) => (b.id === selectedBook.id ? res.data : b)));
      }
      setShowForm(false);
      setSelectedBook(null);
    } catch (err) {
      console.error('Failed to submit book', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📚 Book Dashboard</h1>

      <button onClick={handleAddBook} style={{ marginBottom: '10px' }}>➕ Add New Book</button>

      {showForm && (
        <BookForm
          mode={formMode}
          book={selectedBook}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedBook(null);
          }}
        />
      )}

      {!showForm && selectedBook && (
        <BookDetails book={selectedBook} />
      )}

      <h2>All Books</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>
                <button onClick={() => handleViewBook(book)}>👀 View</button>{' '}
                <button onClick={() => handleEditBook(book)}>✏️ Edit</button>{' '}
                <button onClick={() => handleDeleteBook(book.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
