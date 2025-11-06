import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import { BookForm } from '../BookForm/BookForm';

function BookItem({ book }) {
  const { deleteBook } = useBooks();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditDone = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <BookForm bookToEdit={book} onDone={handleEditDone} />;
  }

  return (
    <div className="book-item"> {/* <-- GANTI DARI "style" KE "className" */}
      <h4>{book.title}</h4>
      <p>oleh: {book.author} (Status: {book.status})</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => deleteBook(book.id)}>Hapus</button>
    </div>
  );
}

export function BookList({ books }) {
  if (books.length === 0) {
    return <p>Tidak ada buku yang cocok dengan pencarian Anda.</p>;
  }

  return (
    <div>
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
}