import React from "react";
import { useNavigate } from "react-router-dom";


const Unauthorize = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <h2 className="text-2xl font-semibold mt-4">Access Denied</h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        You don’t have permission to access this page. Please contact the administrator if you believe this is a mistake.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Unauthorize;