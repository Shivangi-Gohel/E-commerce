import { useGetProductById } from "@/api/productApi";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductById(id);
  const [showImage, setShowImage] = useState();

  useEffect(() => {
    if (data && data.product) {
      setShowImage(data.product.images[0]);
    }
  }, [data]);

  if (isLoading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center mt-20 text-red-500">Product not found</div>
    );
  }

  const product = data.product;
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-1 min-h-screen min-w-screen bg-amber-700/10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="border rounded-2xl overflow-hidden shadow-lg mt-10">
              <img
                src={`http://localhost:8000/uploads/${showImage}`}
                alt={product.name}
                className="w-full h-[450px] object-cover"
              />
            </div>

            <div className="flex gap-4 mt-4">
              {product.images.map((img, index) => (
                <img
                  onClick={() => setShowImage(img)}
                  key={index}
                  src={`http://localhost:8000/uploads/${img}`}
                  alt="product"
                  className="w-24 h-24 object-cover rounded-xl border cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl text-amber-900 font-bold mb-4">
              {product.name}
            </h1>

            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="mb-4">
              <span className="text-2xl font-semibold text-amber-700">
                ₹{product.price}
              </span>
            </div>

            <div className="mb-4">
              <span className="font-medium">Category: </span>
              <span className="text-gray-700 capitalize">
                {product.category}
              </span>
            </div>

            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-amber-700 font-semibold">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </div>

            <div className="flex gap-4">
              <button
                disabled={product.stock === 0}
                className="bg-amber-900 text-white py-3 rounded-2xl font-semibold hover:bg-amber-800 transition w-full  disabled:bg-gray-400"
              >
                Add to Cart
              </button>
              <button
                disabled={product.stock === 0}
                className="bg-amber-900 text-white py-3 rounded-2xl font-semibold hover:bg-amber-800 transition w-full disabled:bg-gray-400"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
