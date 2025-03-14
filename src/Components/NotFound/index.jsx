import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl font-semibold mt-2">Oops! No information found.</p>
        <p className="text-gray-500 mt-2">
          Unfortunately, the data you are looking for does not exist.
        </p>
        <Link to="/" className="mt-5 inline-block bg-blue-500 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-600">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

