import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ProductComponent = ({ productId, onClose }) => {
	const [product, setProduct] = useState(null);
	const [open, setOpen] = useState(true);

	useEffect(() => {
		if (productId) {
			// Fetch product details based on productId
			const apiUrl = `https://dummyjson.com/products/${productId}`;

			fetch(apiUrl)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then((data) => {
					setProduct(data);
				})
				.catch((error) => {
					console.error('There was a problem fetching product details:', error);
				});
		}
	}, [productId]);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => onClose()}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
							enterTo="opacity-100 translate-y-0 md:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 md:scale-100"
							leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
							<Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
								<div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
									<button
										type="button"
										className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
										onClick={() => onClose()}>
										<span className="sr-only">Close</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</button>

									{product ? (
										<div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
											<div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
												<img
													src={product.thumbnail}
													alt={product.title}
													className="object-cover object-center"
												/>
											</div>
											<div className="sm:col-span-8 lg:col-span-7">
												<h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
													{product.title}
												</h2>

												<section
													aria-labelledby="information-heading"
													className="mt-2">
													<h3
														id="information-heading"
														className="sr-only">
														Product information
													</h3>

													<p className="text-2xl text-gray-900">
														${product.price}
													</p>

													{/* Reviews */}
													<div className="mt-6">
														<h4 className="">Reviews</h4>
														<p className="mb-8">
															{product.rating} out of 5 stars
														</p>
														<div className="flex-col items-center">
															<p className="text-lg mb-3">
																Description
															</p>
															<a
																href="#"
																className="text-base font-medium text-indigo-600 hover:text-indigo-500">
																{product.description}
															</a>
														</div>
													</div>
												</section>
											</div>
										</div>
									) : (
										<div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
											<div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"></div>
										</div>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default ProductComponent;
