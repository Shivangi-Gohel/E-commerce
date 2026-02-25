import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}   
        className="mt-6 px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;