import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
	return useContext(CartContext);
}

export function CartProvider({ children }) {
	const storedCartData = JSON.parse(localStorage.getItem('cart')) || {}; // Initialize as an object
	const [cart, setCart] = useState(new Map(Object.entries(storedCartData)));

	useEffect(() => {
		// Update local storage whenever cart changes
		localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cart)));
	}, [cart]);

	const updateCart = (newCart) => {
		setCart(new Map(newCart));
	};

	return <CartContext.Provider value={{ cart, updateCart }}>{children}</CartContext.Provider>;
}
