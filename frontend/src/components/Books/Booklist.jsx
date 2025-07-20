import React from 'react';
import '../../styles/Booklist.css'; // make sure you create this

export default function Booklist({ books = [], isAdmin, onSelectBook, onDeleteBook, onUpdateBook }) {
  const handleToggleStatus = (book) => {
    const updated = { ...book, available: !book.available };
    onUpdateBook(updated);
  };

  if (!books || books.length === 0) {
    return (
      <div className="book-list empty">
        <p>📚 No books found. Please add some!</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      <h3>📚 Book List</h3>

      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <button
                  className="link-button"
                  onClick={() => onSelectBook(book)}
                  aria-label={`View details of ${book.title}`}
                >
                  {book.title}
                </button>
              </td>
              <td>{book.author}</td>
              <td style={{ color: book.available ? 'green' : 'red' }}>
                {book.available ? '✅ Available' : '❌ Checked Out'}
              </td>
              {isAdmin && (
                <td>
                  <button
                    className="small-btn"
                    onClick={() => handleToggleStatus(book)}
                  >
                    {book.available ? 'Mark Unavailable' : 'Mark Available'}
                  </button>
                  <button
                    className="small-btn danger"
                    onClick={() => {
                      if (window.confirm(`Delete "${book.title}"?`)) {
                        onDeleteBook(book.id);
                      }
                    }}
                  >
                    🗑 Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
