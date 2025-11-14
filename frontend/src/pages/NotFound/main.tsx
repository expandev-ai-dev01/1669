import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl font-medium text-gray-600 mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
