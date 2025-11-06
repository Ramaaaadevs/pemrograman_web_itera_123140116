import React from 'react';
import { useBookStats } from '../../hooks/useBookStats';

export function Stats() {
  const { total, owned, reading, wishlist } = useBookStats();

  return (
    <div className="stats-page"> {/* <-- TAMBAHKAN className INI */}
      <h2>Statistik Buku</h2>
      <ul>
        <li><strong>Total Buku:</strong> {total}</li>
        <li><strong>Sudah Dimiliki:</strong> {owned}</li>
        <li><strong>Sedang Dibaca:</strong> {reading}</li>
        <li><strong>Ingin Dibeli:</strong> {wishlist}</li>
      </ul>
    </div>
  );
}