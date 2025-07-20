import React, { useState } from 'react';

export default function BookForm({ onBookAdded }) {
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    description: '',
    available: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookAdded({ ...book, id: Date.now() }); // simulate ID generation
    setBook({ title: '', author: '', isbn: '', description: '', available: true });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="ISBN"
        value={book.isbn}
        onChange={(e) => setBook({ ...book, isbn: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={book.description}
        onChange={(e) => setBook({ ...book, description: e.target.value })}
      />
      <button type="submit">Add Book</button>
    </form>
  );
}
