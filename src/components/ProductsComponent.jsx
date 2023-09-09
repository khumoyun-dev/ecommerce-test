import { useState, useEffect } from 'react';
import PaginationComponent from './PaginationComponent';
import ProductComponent from './ProductComponent';
import AlertComponent from './AlertComponent';
import { useCart } from '../context/CartContext';
import FilterComponent from './FilterComponent';

export default function ProductsComponent() {
	const [products, setProducts] = useState([]);
	const [totalProducts, setTotalProducts] = useState(0);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showAlert, setShowAlert] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('All');
	const itemsPerPage = 20;

	// Initialize cart state and retrieve from local storage
	const { cart, updateCart } = useCart();

	useEffect(() => {
		const apiUrl =
			selectedCategory === 'All'
				? `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
						(currentPage - 1) * itemsPerPage
				  }`
				: `https://dummyjson.com/products/category/${selectedCategory}?limit=${itemsPerPage}&skip=${
						(currentPage - 1) * itemsPerPage
				  }`;

		fetch(apiUrl)
			.then(async (response) => {
				setLoading(true);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				await new Promise((resolve) => setTimeout(resolve, 500));
				return await response.json();
			})
			.then((data) => {
				// Update the state with the fetched products

				setProducts(data.products);
				setTotalProducts(data.total);
				setLoading(false); // Set loading to false once data is fetched
			})
			.catch((error) => {
				console.error('There was a problem fetching data:', error);
				setLoading(false); // Set loading to false in case of an error
			});
	}, [currentPage, selectedCategory]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// Function to handle opening the product dialog
	const openProductDialog = (product) => {
		setSelectedProduct(product);
	};

	// Function to close the product dialog
	const closeProductDialog = () => {
		setSelectedProduct(null);
	};

	// Function to add a product to the cart
	const addToCart = (productId) => {
		const updatedCart = new Map(cart);

		if (updatedCart.has(productId)) {
			updatedCart.set(productId, updatedCart.get(productId) + 1);
		} else {
			updatedCart.set(productId, 1);
		}

		updateCart(updatedCart);

		setShowAlert(true);
		setTimeout(() => {
			setShowAlert(false);
		}, 3000);
	};

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<div className="flex justify-between">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
					<FilterComponent
						selectedCategory={selectedCategory}
						onChangeCategory={setSelectedCategory}
					/>
				</div>

				{loading ? (
					<div className="flex justify-center py-36">
						<span className="relative flex h-24 w-24 self-center">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400"></span>
							<span className="relative inline-flex rounded-full h-24 w-24 bg-indigo-400 opacity-30"></span>
						</span>
					</div>
				) : (
					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
							<div
								key={product.id}
								onClick={() => openProductDialog(product.id)}
								className="group relative border border-gray-300 rounded-md pb-3">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md rounded-b-none border-b border-gray-300 bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<img
										src={product.thumbnail}
										alt={product.title}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full hidden"
										onLoad={(e) => {
											e.target.classList.remove('hidden');
										}}
									/>
								</div>
								<div className="mt-4 flex justify-between p-3">
									<div>
										<h3 className="text-sm text-gray-700 max-w-[180px] truncate font-medium">
											<a href="#">
												<span
													aria-hidden="true"
													className="absolute inset-0"
												/>
												{product.title}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{product.brand}
										</p>
									</div>
									<p className="text-sm font-medium text-gray-900">
										${product.price}
									</p>
								</div>
								<button
									onClick={(e) => {
										e.stopPropagation();
										addToCart(product.id);
									}}
									className="mt-2 ml-3 bg-indigo-600 group-hover:bg-indigo-800 text-white px-4 py-2 rounded-md text-sm font-medium transform transition duration-300 ease-in-out hover:scale-105">
									Add to Cart
								</button>
							</div>
						))}
					</div>
				)}
			</div>
			<PaginationComponent
				totalProducts={totalProducts}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
			{selectedProduct && (
				<ProductComponent
					productId={selectedProduct}
					onClose={closeProductDialog} // Pass a callback to close the dialog
				/>
			)}
			{showAlert && <AlertComponent message="Added to the Cart!" type="success" />}
		</div>
	);
}
