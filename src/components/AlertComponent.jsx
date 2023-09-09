function AlertComponent({ message, type }) {
	return (
		<div
			className={`flex fixed top-5 right-5 items-center border-2 border-white p-4 mb-4 text-sm ${
				type === 'success' ? 'text-green-800' : 'text-red-800'
			} rounded-lg ${type === 'success' ? 'bg-green-50' : 'bg-red-50'} dark:bg-gray-800 ${
				type === 'success' ? 'dark:text-green-400' : 'dark:text-red-400'
			}`}
			role="alert">
			{type === 'success' ? (
				<svg
					className="flex-shrink-0 inline w-4 h-4 mr-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20">
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
				</svg>
			) : (
				<svg
					className="flex-shrink-0 inline w-4 h-4 mr-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 20">
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9 14a1 1 0 0 1 2 0v-4a1 1 0 0 1-2 0v4ZM9 5a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0V5Z" />
				</svg>
			)}
			<span className="sr-only">{type === 'success' ? 'Success' : 'Error'}</span>
			<div className="font-medium">{message}</div>
		</div>
	);
}

export default AlertComponent;
