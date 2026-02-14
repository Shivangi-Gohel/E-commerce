import { useGetProducts } from "@/api/productApi";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";

const Items = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetProducts(page);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setDisplayData(data.data);
    }
  }, [data]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-amber-700/10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex w-full max-w-3xl shadow-lg rounded-2xl overflow-hidden">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-6 py-3 border border-amber-950/20 outline-none"
              />
              <button className="bg-amber-900 hover:bg-amber-900/90 text-white px-6 font-semibold transition">
                Search
              </button>
            </div>
          </div>

          <div className="flex justify-between mb-8">
            <select className="border border-amber-950/30 bg-white px-6 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-400 outline-none">
              <option value="">Sort by price</option>
            </select>

            <select className="border border-amber-950/30 bg-white px-6 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-400 outline-none">
              <option value="">Sort by category</option>
            </select>
          </div>

          {displayData && displayData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {displayData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      className="h-60 w-full object-cover hover:scale-105 transition duration-300"
                      src={`http://localhost:8000/uploads/${item.images[0]}`}
                      alt={item.name}
                    />
                  </div>

                  <div className="mt-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {item.name}
                    </h3>
                    <p className="text-amber-900 font-bold text-lg mt-1">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-amber-900 hover:bg-amber-900/90 text-white py-2 rounded-xl transition">
                      Add to Cart
                    </button>
                    <button className="flex-1 border border-amber-900 text-amber-900 hover:bg-amber-100 py-2 rounded-xl transition">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No products found.
            </p>
          )}

          {/* Show More Button */}
          <div className="flex justify-center mt-10">
            <button
              disabled={data?.totalPages === page}
              onClick={() => setPage(page + 1)}
              className="bg-amber-900 hover:bg-amber-900/90 disabled:bg-orange-300 text-white px-10 py-3 rounded-2xl font-semibold shadow-md transition"
            >
              Show More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Items;
