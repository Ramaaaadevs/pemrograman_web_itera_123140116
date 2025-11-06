import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookForm } from './BookForm';
import { BookProvider } from '../../context/BookContext';

jest.mock('../../context/BookContext', () => ({
  ...jest.requireActual('../../context/BookContext'),
  useBooks: () => ({
    addBook: jest.fn(),
    updateBook: jest.fn(),
  }),
}));

describe('BookForm', () => {
  test('3. renders the form correctly', () => {
    render(
      <BookProvider>
        <BookForm onDone={() => {}} />
      </BookProvider>
    );
    expect(screen.getByLabelText(/Judul/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Penulis/i)).toBeInTheDocument();
    expect(screen.getByText('Simpan')).toBeInTheDocument();
  });

  test('4. shows error message on empty submit', () => {
    render(
      <BookProvider>
        <BookForm onDone={() => {}} />
      </BookProvider>
    );
    fireEvent.click(screen.getByText('Simpan'));
    expect(screen.getByText('Judul dan Penulis tidak boleh kosong')).toBeInTheDocument();
  });
});