import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';

// Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import SearchResult from './pages/SearchResult';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';


export default function App() {
	// Initially set the user token
	if (sessionStorage.hasOwnProperty('user') === false) {
		sessionStorage.setItem('user', '{}');
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route index element={<Home />} />
				<Route path="searchResult" element={<SearchResult />} />
				<Route path="cart" element={<Cart />} />
				<Route path="products/:productId" element={<ProductDetail />} />
				<Route path="login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
