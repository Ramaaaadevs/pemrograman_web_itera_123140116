import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';

export function BookForm({ bookToEdit, onDone }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('beli');
  const [error, setError] = useState('');
  const { addBook, updateBook } = useBooks();

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setStatus(bookToEdit.status);
    }
  }, [bookToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) {
      // --- PERBAIKAN DI SINI ---
      // Ubah "wajib diisi" menjadi "tidak boleh kosong" agar tesnya lulus
      setError('Judul dan Penulis tidak boleh kosong');
      // --- BATAS PERBAIKAN ---
      return;
    }
    
    const bookData = { title, author, status };
    if (bookToEdit) {
      updateBook({ ...bookData, id: bookToEdit.id });
    } else {
      addBook(bookData);
    }
    onDone();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{bookToEdit ? 'Edit Buku' : 'Tambah Buku'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div>
        <label htmlFor="title-input">Judul: </label>
        <input 
          id="title-input" 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="author-input">Penulis: </label>
        <input 
          id="author-input" 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="status-select">Status: </label>
        <select 
          id="status-select" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="beli">Ingin Dibeli</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="milik">Sudah Dimiliki</option>
        </select>
      </div>

      <button type="submit">{bookToEdit ? 'Update' : 'Simpan'}</button>
      <button type="button" onClick={onDone}>Batal</button>
    </form>
  );
}