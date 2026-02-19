import { useAddToCart } from "@/api/cartApi";
import { useGetProductById } from "@/api/productApi";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCreateOrder } from "@/api/orderApi";

const ItemDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductById(id);
  const [showImage, setShowImage] = useState();
  const [qty, setQty] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const { mutate: addToCart } = useAddToCart();
  const { mutate: createOrder } = useCreateOrder();

  const handleAddToCart = () => {
    addToCart(
      { productId: id, quantity: qty },
      {
        onSuccess: (data) => {
          toast.success("Product added to cart successfully");
        },
        onError: (error) => {
          toast.error("Failed to add product to cart");
        },
      },
    );
  };

  const handleCreateOrder = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const paymentStatus = paymentMethod === "online" ? "Success" : "Pending";

    if (paymentMethod === "online") {
      setIsPaymentProcessing(true);

      setTimeout(() => {
        setIsPaymentProcessing(false);
        toast.success("Payment successful");

        createOrder(
          {
            items: [{ productId: id, quantity: qty }],
            payment: paymentStatus,
          },
          {
            onSuccess: () => {
              toast.success("Order created successfully");
              setShowPaymentModal(false);
            },
            onError: () => {
              toast.error("Failed to create order");
            },
          },
        );
      }, 3000);
    } else {
      createOrder(
        {
          items: [{ productId: id, quantity: qty }],
          payment: paymentStatus,
        },
        {
          onSuccess: () => {
            toast.success("Order created successfully");
            setShowPaymentModal(false);
          },
          onError: () => {
            toast.error("Failed to create order");
          },
        },
      );
    }
  };

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

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                max={product.stock}
                defaultValue="1"
                onChange={(e) => setQty(parseInt(e.target.value))}
                className="p-2 border border-gray-900/30 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-amber-900 text-white py-3 rounded-2xl font-semibold hover:bg-amber-800 transition w-full  disabled:bg-gray-400"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setShowPaymentModal(true)}
                disabled={product.stock === 0}
                className="bg-amber-900 text-white py-3 rounded-2xl font-semibold hover:bg-amber-800 transition w-full disabled:bg-gray-400"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-end justify-center">
          <div
            className={`bg-white w-full md:w-[500px] rounded-t-3xl p-6 shadow-2xl transform transition-transform duration-500 ${
              showPaymentModal ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-amber-900">
              Choose Payment Method
            </h2>

            <div className="space-y-4">
              <div
                onClick={() => setPaymentMethod("online")}
                className={`p-4 border rounded-xl cursor-pointer transition ${
                  paymentMethod === "online"
                    ? "border-amber-700 bg-amber-50"
                    : "hover:border-amber-400"
                }`}
              >
                <h3 className="font-semibold text-lg">💳 Online Payment</h3>
                <p className="text-gray-500 text-sm">
                  Pay securely using UPI / Card / Net Banking
                </p>
              </div>

              <div
                onClick={() => setPaymentMethod("cod")}
                className={`p-4 border rounded-xl cursor-pointer transition ${
                  paymentMethod === "cod"
                    ? "border-amber-700 bg-amber-50"
                    : "hover:border-amber-400"
                }`}
              >
                <h3 className="font-semibold text-lg">📦 Cash on Delivery</h3>
                <p className="text-gray-500 text-sm">
                  Pay when the product is delivered
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateOrder}
                className="w-full py-3 rounded-xl bg-amber-900 text-white hover:bg-amber-800 transition"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
      {isPaymentProcessing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-amber-900">
              Processing Payment...
            </h2>
            <p className="text-gray-500">
              Please wait while we process your payment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
