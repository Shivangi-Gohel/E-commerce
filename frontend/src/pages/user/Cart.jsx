import { useClearCart, useGetCart, useRemoveFromCart } from "@/api/cartApi";
import { useCreateOrder } from "@/api/orderApi";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const { data: cart, isLoading, error } = useGetCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: createOrder } = useCreateOrder();
  const { mutate: clearCart } = useClearCart();

  const totalItems = cart?.cart?.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const subtotal = cart?.cart?.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0,
  );

  const handleRemoveFromCart = (productId) => () => {
    removeFromCart(
      { productId },
      {
        onSuccess: (data) => {
          toast.success("Item removed from cart successfully");
          window.location.reload();
        },
        onError: (error) => {
          toast.error("Failed to remove item from cart");
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
            items: cart.cart.items.map((item) => ({
              productId: item.productId._id,
              quantity: item.quantity,
            })),
            payment: paymentStatus,
          },
          {
            onSuccess: () => {
              toast.success("Order created successfully");
              clearCart();
              setShowPaymentModal(false);
              window.location.reload();
            },
            onError: (error) => {
              toast.error("Failed to create order");
              setShowPaymentModal(false);
            },
          },
        );
      }, 3000);
    } else {
      createOrder(
        {
          items: cart.cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          payment: paymentStatus,
        },
        {
          onSuccess: () => {
            toast.success("Order created successfully");
            clearCart();
            setShowPaymentModal(false);
            window.location.reload();
          },
          onError: (error) => {
            toast.error("Failed to create order");
            setShowPaymentModal(false);
          },
        },
      );
    }
  };

  const deliveryCharge = subtotal > 2000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + deliveryCharge + tax;

  if (isLoading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">Failed to load cart</div>
    );
  }

  return (
    <div>
      <Navbar />

      {cart && cart?.cart.items.length > 0 ? (
        <div className="max-w-6xl mx-auto px-30 py-10 bg-amber-700/10 min-w-screen min-h-screen">
          <h2 className="text-3xl font-bold mb-8 text-amber-900">
            Your Shopping Cart
          </h2>

          <div className="space-y-6">
            {cart.cart.items.map((item) => {
              const itemTotal = item.productId.price * item.quantity;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6"
                >
                  <img
                    src={`http://localhost:8000/uploads/${item.productId.images[0]}`}
                    alt={item.productId.name}
                    className="w-32 h-32 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {item.productId.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      ₹{item.productId.price} per item
                    </p>

                    <p className="text-gray-600 mt-1">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-lg font-bold text-amber-700 mt-2">
                      ₹{itemTotal}
                    </p>

                    <button
                      onClick={handleRemoveFromCart(item.productId._id)}
                      className="mt-4 bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded-xl transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-xl font-bold">
                <span>Grand Total</span>
                <span className="text-amber-700">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="mt-8 w-full bg-amber-800 hover:bg-amber-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-amber-700/10 px-6">
          <div className="bg-white shadow-lg rounded-3xl p-10 text-center max-w-md w-full">
            <div className="text-6xl mb-6">🛒</div>

            <h2 className="text-2xl font-bold mb-3">Your Cart is Empty</h2>

            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything yet. Start shopping to fill
              your cart with amazing products.
            </p>

            <button
              onClick={() => navigate("/item")}
              className="w-full bg-amber-800 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
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

export default Cart;
