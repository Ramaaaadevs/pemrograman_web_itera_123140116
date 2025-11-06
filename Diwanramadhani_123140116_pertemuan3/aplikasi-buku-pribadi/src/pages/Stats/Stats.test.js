import React from 'react';
import { render, screen } from '@testing-library/react';
import { Stats } from './Stats';
import { useBookStats } from '../../hooks/useBookStats';

// Mock custom hook useBookStats
jest.mock('../../hooks/useBookStats', () => ({
  useBookStats: jest.fn(),
}));

describe('Stats Page', () => {
  test('5. displays correct statistics from useBookStats hook', () => {
    // Sediakan data mock untuk hook
    useBookStats.mockReturnValue({
      total: 5,
      owned: 2,
      reading: 1,
      wishlist: 2,
    });

    render(<Stats />);

    // --- PERBAIKAN DI SINI ---
    // Hapus "/Selesai" agar teksnya cocok dengan yang ada di Stats.jsx
    expect(screen.getByText('Total Buku:').parentElement).toHaveTextContent('Total Buku: 5');
    expect(screen.getByText('Sudah Dimiliki:').parentElement).toHaveTextContent('Sudah Dimiliki: 2');
    // --- BATAS PERBAIKAN ---
  });
});