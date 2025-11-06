import React from 'react';

/* PASTIKAN BAGIAN INI BENAR:
  Kita menerima 'search' dan 'status' di dalam kurung kurawal
*/
export function BookFilter({ search, onSearch, status, onStatusFilter }) {
  return (
    <div className="filter-container">
      {/* Kita menggunakan 'search' (bukan searchTerm) */}
      <input
        type="text"
        placeholder="Cari judul/penulis..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
      
      {/* Kita menggunakan 'status' (bukan statusFilter) */}
      <select value={status} onChange={(e) => onStatusFilter(e.target.value)}>
        <option value="semua">Semua Status</option>
        <option value="beli">Ingin Dibeli</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="milik">Sudah Dimiliki</option>
      </select>
    </div>
  );
}