import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useGetOrderById } from "@/api/orderApi";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetOrderById();

  // if (isLoading) {
  //   return <div className="text-center mt-20 text-xl">Loading order...</div>;
  // }

  // if (error) {
  //   return (
  //     <div className="text-center mt-20 text-red-500">
  //       Failed to load order details
  //     </div>
  //   );
  // }

  const order = data?.orders || [];

  return (
    <div>
      <Navbar />

      <div className="w-full bg-amber-700/10 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-amber-900 mb-10">My Orders</h1>

          <div className="space-y-10">
            {!order || order.length === 0 ? (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-md border border-amber-100">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="No Orders"
        className="w-24 h-24 mb-6 opacity-70"
      />
      <h2 className="text-2xl font-semibold text-amber-900">
        No Orders Yet
      </h2>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        Looks like you haven’t placed any orders yet. Start shopping and your
        orders will appear here.
      </p>

      <button
        onClick={() => navigate("/item")}
        className="mt-6 px-6 py-2 bg-amber-900 text-white rounded-xl hover:bg-amber-800 transition"
      >
        Start Shopping
      </button>
    </div>
  ) : (
            order.map((o) => (
              <div
                key={o._id}
                className="bg-white rounded-3xl shadow-lg p-8 border border-amber-100"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-6 mb-6 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-semibold">{o._id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Placed On</p>
                    <p className="font-semibold">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                      {o.status}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-sm text-gray-500">Payment</p>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        o.payment === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {o.payment}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-6">
                  {o.items.map((item) => {
                    const itemTotal = item.price * item.quantity;

                    return (
                      <div
                        key={item._id}
                        className="flex flex-col md:flex-row md:items-center gap-6 border-b pb-6"
                      >
                        {/* Product Image */}
                        <img
                          src={`http://localhost:8000/uploads/${item.productId.images[0]}`}
                          alt={item.productId.name}
                          className="w-28 h-28 object-cover rounded-2xl shadow"
                        />

                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">
                            {item.productId.name}
                          </h3>

                          <p className="text-gray-500 mt-1">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>

                        {/* Item Total */}
                        <div className="text-lg font-bold text-amber-800">
                          ₹{itemTotal}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Delivery Address</p>
                    <p className="font-medium">{o.address}</p>
                  </div>

                  <div className="text-xl font-bold text-amber-900">
                    Total: ₹{o.totalAmount}
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
