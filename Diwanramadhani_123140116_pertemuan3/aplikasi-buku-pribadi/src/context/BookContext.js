import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);

  const addBook = (book) => {
    const newBook = { ...book, id: Date.now() };
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  const updateBook = (updatedBook) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}