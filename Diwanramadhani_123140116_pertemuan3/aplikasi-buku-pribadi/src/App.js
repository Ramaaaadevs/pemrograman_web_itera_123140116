import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Stats } from './pages/Stats/Stats';
import { BookProvider } from './context/BookContext';

function App() {
  return (
    <BookProvider>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stats">Statistik</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </BookProvider>
  );
}

export default App;