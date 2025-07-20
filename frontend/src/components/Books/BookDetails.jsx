import React, { useState } from 'react';
import './styles/BookDetails.css'; // optional CSS

export default function BookDetails({ book, isAdmin, onUpdateBook, onClose }) {
  const [editMode, setEditMode] = useState(false);
  const [editedBook, setEditedBook] = useState(book || {});

  if (!book) {
    return (
      <div className="book-details-empty">
        📖 <em>No book selected. Please select a book to view details.</em>
      </div>
    );
  }

  const handleChange = (field, value) => {
    setEditedBook({ ...editedBook, [field]: value });
  };

  const handleSave = () => {
    onUpdateBook(editedBook);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedBook(book);
    setEditMode(false);
  };

  return (
    <div className="book-details-container">
      <h3>📖 Book Details</h3>

      {editMode ? (
        <div className="book-details-edit">
          <label>
            Title:
            <input
              type="text"
              value={editedBook.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              value={editedBook.author}
              onChange={(e) => handleChange('author', e.target.value)}
            />
          </label>
          <label>
            Year:
            <input
              type="text"
              value={editedBook.year}
              onChange={(e) => handleChange('year', e.target.value)}
            />
          </label>
          <label>
            ISBN:
            <input
              type="text"
              value={editedBook.isbn}
              onChange={(e) => handleChange('isbn', e.target.value)}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={editedBook.category}
              onChange={(e) => handleChange('category', e.target.value)}
            />
          </label>
          <label>
            Status:
            <select
              value={editedBook.available ? 'Available' : 'Checked Out'}
              onChange={(e) =>
                handleChange('available', e.target.value === 'Available')
              }
            >
              <option>Available</option>
              <option>Checked Out</option>
            </select>
          </label>

          <div className="book-details-buttons">
            <button onClick={handleSave}>💾 Save</button>
            <button onClick={handleCancel}>❌ Cancel</button>
          </div>
        </div>
      ) : (
        <table className="book-details-table">
          <tbody>
            <tr>
              <td><strong>Title:</strong></td>
              <td>{book.title}</td>
            </tr>
            <tr>
              <td><strong>Author:</strong></td>
              <td>{book.author}</td>
            </tr>
            <tr>
              <td><strong>Year:</strong></td>
              <td>{book.year}</td>
            </tr>
            <tr>
              <td><strong>ISBN:</strong></td>
              <td>{book.isbn || '—'}</td>
            </tr>
            <tr>
              <td><strong>Category:</strong></td>
              <td>{book.category || '—'}</td>
            </tr>
            <tr>
              <td><strong>Status:</strong></td>
              <td style={{ color: book.available ? 'green' : 'red' }}>
                {book.available ? 'Available' : 'Checked Out'}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="book-details-actions">
        {isAdmin && !editMode && (
          <button onClick={() => setEditMode(true)}>✏️ Edit</button>
        )}
        <button onClick={onClose}>⬅️ Back</button>
      </div>
    </div>
  );
}
