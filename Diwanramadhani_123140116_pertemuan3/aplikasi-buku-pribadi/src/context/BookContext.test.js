import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookProvider, useBooks } from './BookContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

jest.mock('../hooks/useLocalStorage', () => ({
  useLocalStorage: jest.fn(),
}));

const TestComponent = () => {
  const { books, addBook, deleteBook } = useBooks();
  return (
    <div>
      <button onClick={() => addBook({ title: 'Test Book', author: 'Test Author', status: 'beli' })}>
        Add
      </button>
      <button onClick={() => deleteBook(1)}>Delete</button>
      <div data-testid="book-count">{books.length}</div>
      {books.map(b => <div key={b.id}>{b.title}</div>)}
    </div>
  );
};

describe('BookContext', () => {
  let setBooksMock;

  beforeEach(() => {
    setBooksMock = jest.fn();
    useLocalStorage.mockImplementation(() => [[], setBooksMock]);
  });

  test('1. addBook adds a book to the list', () => {
    render(
      <BookProvider>
        <TestComponent />
      </BookProvider>
    );
    fireEvent.click(screen.getByText('Add'));
    expect(setBooksMock).toHaveBeenCalledWith(expect.any(Function));
  });

  test('2. deleteBook removes a book from the list', () => {
    const initialBooks = [{ id: 1, title: 'Book to Delete', author: 'Author', status: 'milik' }];
    useLocalStorage.mockImplementation(() => [initialBooks, setBooksMock]);

     render(
      <BookProvider>
        <TestComponent />
      </BookProvider>
    );
    fireEvent.click(screen.getByText('Delete'));
    expect(setBooksMock).toHaveBeenCalledWith(expect.any(Function));
    const updaterFunction = setBooksMock.mock.calls[0][0];
    expect(updaterFunction(initialBooks)).toEqual([]);
  });
});