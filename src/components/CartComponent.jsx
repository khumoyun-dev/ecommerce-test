import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const CartComponent = () => {
	const { cart, updateCart } = useCart();
	const [cartWithDetails, setCartWithDetails] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productCache, setProductCache] = useState({});

	useEffect(() => {
		const fetchProductDetails = async () => {
			setLoading(true);
			const productIds = Array.from(cart.keys());
			const batchRequests = productIds.map(async (productId) => {
				const apiUrl = `https://dummyjson.com/products/${productId}`;
				try {
					const response = await fetch(apiUrl);
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					const data = await response.json();
					data['quantity'] = cart.get(productId);
					return data;
				} catch (error) {
					console.error(`Error fetching product details for ${productId}:`, error);
					return null;
				}
			});

			const productDetails = await Promise.all(batchRequests);

			const filteredProductDetails = productDetails.filter((detail) => detail !== null);

			filteredProductDetails.forEach((productDetail, index) => {
				setProductCache((prevCache) => ({
					...prevCache,
					[productIds[index]]: productDetail,
				}));
			});

			setCartWithDetails(filteredProductDetails);
			setLoading(false);
		};

		fetchProductDetails();
	}, [cart]);

	const removeFromCart = (productId) => {
		const updatedCart = new Map(cart);

		if (updatedCart.has(productId)) {
			const currentQuantity = updatedCart.get(productId);

			if (currentQuantity === 1) {
				// If there's only one of this product, remove it from the cart
				updatedCart.delete(productId);
			} else {
				// If there's more than one, decrease the quantity by 1
				updatedCart.set(productId, currentQuantity - 1);
			}

			updateCart(updatedCart); // Update the cart state with the new map
		}
	};

	const getTotalPrice = () => {
		let total = 0;
		cartWithDetails.forEach((product) => {
			total += product.price * product.quantity;
		});
		return total;
	};

	return (
		<div className="bg-gray-100 min-h-screen">
			<div className="container mx-auto p-6 sm:px-28">
				<h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
				<ul className={loading ? 'hidden' : ''}>
					{cartWithDetails.map((product) => (
						<li
							key={product.id}
							className="flex items-center justify-between border-b border-gray-300 py-2">
							<div className="flex items-center space-x-2">
								<img
									src={product.thumbnail}
									alt={product.title}
									className="w-20 h-20 object-cover rounded"
								/>
								<div>
									<p className="text-lg font-semibold">{product.title}</p>
									<p className="text-gray-500">{product.brand}</p>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<p className="text-lg font-semibold">${product.price}</p>
								<p className="text-gray-500">: {product.quantity}</p>
								<button
									onClick={() => removeFromCart(product.id + '')}
									className="text-red-500 hover:text-red-600">
									<XMarkIcon className="w-6 h-6" />
								</button>
							</div>
						</li>
					))}
				</ul>
				<div className="flex items-center justify-end mt-4 space-x-6">
					<p className="text-xl font-semibold">Total: ${getTotalPrice()}</p>
					<button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
						Checkout
					</button>
				</div>
				{loading && (
					<div className="flex justify-center py-36">
						<span className="relative flex h-24 w-24 self-center">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400"></span>
							<span className="relative inline-flex rounded-full h-24 w-24 bg-indigo-400 opacity-30"></span>
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartComponent;
