import { useAddToCart } from "@/api/cartApi";
import { useGetProducts } from "@/api/productApi";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Items = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProducts(page);
  const [displayData, setDisplayData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { mutate: addToCart } = useAddToCart();

  const sortByPrice = (order) => {
    const sortedData = [...displayData].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      }
      else if (order === "desc") {
        return b.price - a.price;
      } 
    });
    setDisplayData(sortedData);
  }

  const sortByCategory = (category) => {
    const filteredData = data.data.filter((item) => item.category === category);
    setDisplayData(filteredData);
  }

  const resetFilters = () => {
    setDisplayData(data.data);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredData = data.data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayData(filteredData);
  }

  const handleAddToCart = (item) => {
    addToCart(
      { productId: item._id, quantity: 1 },
      {
        onSuccess: (data) => {
          toast.success("Product added to cart successfully");
          queryClient.invalidateQueries(["cart"]);
        },
        onError: (error) => {
          toast.error("Failed to add product to cart");
        },
      },
    );
  };

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
            <form className="flex w-full max-w-3xl shadow-lg rounded-2xl border border-amber-950/20 overflow-hidden">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 sm:px-6 px-2 py-3 outline-none"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-amber-900 hover:bg-amber-900/90 text-white sm:px-6 px-2 font-semibold transition" onClick={handleSearch}>
                Search
              </button>
            </form>
          </div>

          <div className="sm:flex justify-between mb-8">
            <select className="border border-amber-950/30 bg-white px-6 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-400 outline-none" onChange={(e) => sortByPrice(e.target.value)}>
              <option value="">Sort by price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>

            <select className="border border-amber-950/30 bg-white px-6 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-400 outline-none" onChange={(e) => sortByCategory(e.target.value)}>
              <option value="">Sort by category</option>
              <option value="men's wear">Men's Wear</option>
              <option value="women's wear">Women's Wear</option>
              <option value="children's wear">Children's Wear</option>
            </select>
            <button className="bg-amber-900 hover:bg-amber-900/90 text-white px-6 py-2 rounded-xl shadow-sm transition" onClick={resetFilters}>
              Reset Filters
            </button>
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
                    <button className="flex-1 bg-amber-900 hover:bg-amber-900/90 text-white py-2 rounded-xl transition" onClick={() => handleAddToCart(item)}>
                      Add to Cart
                    </button>
                    <button onClick={() => navigate(`/item/${item._id}`)} className="flex-1 border border-amber-900 text-amber-900 hover:bg-amber-100 py-2 rounded-xl transition">
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
