import { Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import ProductsComponent from './components/ProductsComponent';
import CartComponent from './components/CartComponent';
import ProductComponent from './components/ProductComponent';
import { CartProvider } from './context/CartContext';

function App() {
	return (
		<>
			<CartProvider>
				<NavbarComponent />
				<Routes>
					<Route path="/" element={<ProductsComponent />} />
					<Route path="/cart" element={<CartComponent />} />
					<Route path="/product" element={<ProductComponent />} />
				</Routes>
			</CartProvider>
		</>
	);
}

export default App;
