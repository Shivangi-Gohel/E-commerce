import React, { useEffect, useState } from "react";
import { useUser } from "@/context/Context.jsx";
import Navbar from "@/components/Navbar";
import { useUpdateUser } from "@/api/userApi";
import toast from "react-hot-toast";

const Profile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const { user } = useUser();
  const { mutate: updateUser } = useUpdateUser();

  const handleUpdate = () => {
    updateUser(data, {
      onSuccess: () => {
        setIsUpdating(false);
        toast.success("Profile updated successfully");
      },
    });
  };

  useEffect(() => {
    setData({
      name: user?.name || "",
      email: user?.email || "",
      address: user?.address || "",
      phone: user?.phone || "",
    });
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-amber-700/10 flex justify-center items-center p-6">
        <div className="bg-white shadow-xl rounded-3xl w-full max-w-lg p-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-amber-900 text-white flex items-center justify-center text-3xl font-bold">
              {data.name.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-4 text-2xl font-bold">{data.name}</h2>
            <p className="text-gray-500">{data.email}</p>

            {user?.isAdmin && (
              <span className="mt-2 px-4 py-1 text-sm bg-amber-900 text-white rounded-full">
                Admin
              </span>
            )}
          </div>

          <div className="my-6 border-t"></div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Phone</span>
              <span>{data.phone}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Address</span>
              <span>{data.address}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">User ID</span>
              <span className="text-sm text-gray-400">{user?._id}</span>
            </div>
          </div>

          <button
            className="mt-8 w-full bg-amber-900 hover:bg-amber-900/90 text-white py-3 rounded-xl font-semibold transition"
            onClick={() => setIsUpdating(true)}
          >
            Edit Profile
          </button>
          {isUpdating && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-amber-900 text-center">
                  Update Profile
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate();
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={data.address}
                      onChange={(e) =>
                        setData({ ...data, address: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={data.phone}
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-amber-900 hover:bg-amber-800 text-white py-2 rounded-lg"
                    >
                      Update Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsUpdating(false)}
                      className="flex-1 border border-amber-900 text-amber-900 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
