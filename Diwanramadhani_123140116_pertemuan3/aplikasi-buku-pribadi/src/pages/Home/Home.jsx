import React, { useState, useMemo } from 'react';
import { useBooks } from '../../context/BookContext';
import { BookList } from '../../components/BookList/BookList';
import { BookFilter } from '../../components/BookFilter/BookFilter';
import { BookForm } from '../../components/BookForm/BookForm';

export function Home() {
  const { books } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const statusMatch = statusFilter === 'semua' || book.status === statusFilter;
      const searchMatch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [books, searchTerm, statusFilter]);

  return (
    <div>
      <h2>Koleksi Buku Saya</h2>
      
      {!isFormOpen && (
        <button onClick={() => setIsFormOpen(true)}>+ Tambah Buku</button>
      )}
      {isFormOpen && <BookForm onDone={() => setIsFormOpen(false)} />}

      <hr />
      
      {/* PASTIKAN BAGIAN INI BENAR:
        Kita mengirim prop bernama 'search' (isinya variabel searchTerm)
        Kita mengirim prop bernama 'status' (isinya variabel statusFilter)
      */}
      <BookFilter
        search={searchTerm}
        onSearch={setSearchTerm}
        status={statusFilter}
        onStatusFilter={setStatusFilter}
      />
      
      <BookList books={filteredBooks} />
    </div>
  );
}