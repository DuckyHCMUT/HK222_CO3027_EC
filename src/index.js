import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

// Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import SearchResult from './pages/SearchResult';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="searchResult" element={<SearchResult />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
