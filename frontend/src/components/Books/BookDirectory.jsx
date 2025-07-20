import { useState, useEffect } from 'react';
import BookList from './Booklist';
import BookForm from './BookForm';
import BookDetails from './BookDetails';
import '../styles/BookDirectory.css';

export default function BookDirectory({ isAdmin }) {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  // fetch books from backend
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books'); // adjust API endpoint
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleAddBook = (newBook) => {
    setBooks(prev => [...prev, newBook]);
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks(prev => prev.map(b => (b.id === updatedBook.id ? updatedBook : b)));
  };

  const handleDeleteBook = (id) => {
    setBooks(prev => prev.filter(b => b.id !== id));
    setSelectedBook(null);
  };

  return (
    <div className="book-directory">
      <h2>📚 Book Directory</h2>

      {/* Book List */}
      <BookList
        books={books}
        isAdmin={isAdmin}
        onSelectBook={handleSelectBook}
        onDeleteBook={handleDeleteBook}
        onUpdateBook={handleUpdateBook}
      />

      {/* Book Details */}
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          isAdmin={isAdmin}
          onUpdateBook={handleUpdateBook}
        />
      )}

      {/* Book Form - only for admin */}
      {isAdmin && (
        <div className="book-form">
          <h3>Add a New Book</h3>
          <BookForm onBookAdded={handleAddBook} />
        </div>
      )}
    </div>
  );
}
