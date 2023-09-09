import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function PaginationComponent({ totalProducts, currentPage, onPageChange }) {
	const itemsPerPage = 20;
	const totalPages = Math.ceil(totalProducts / itemsPerPage);
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			<div className="flex flex-1 justify-between sm:hidden">
				<a
					href="#"
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
					className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
					Previous
				</a>
				<a
					href="#"
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
					Next
				</a>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-700">
						Showing{' '}
						<span className="font-medium">{(currentPage - 1) * itemsPerPage || 1}</span>{' '}
						to{' '}
						<span className="font-medium">{(currentPage - 1) * itemsPerPage + 20}</span>{' '}
						of <span className="font-medium">{totalProducts}</span> results
					</p>
				</div>
				<div>
					<nav
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination">
						<a
							href="#"
							onClick={handlePreviousPage}
							disabled={currentPage === 1}
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</a>
						{pageNumbers.map((page) => (
							<a
								key={page}
								onClick={() => onPageChange(page)}
								href="#"
								aria-current="page"
								// `relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`
								className={
									currentPage === page
										? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
										: 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
								}>
								{page}
							</a>
						))}
						<a
							href="#"
							onClick={handleNextPage}
							disabled={currentPage === totalPages}
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
							<span className="sr-only">Next</span>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</a>
					</nav>
				</div>
			</div>
		</div>
	);
}
