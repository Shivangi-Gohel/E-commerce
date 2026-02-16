import React from "react";
import { useState } from "react";
import { X, Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/Context";
import toast from "react-hot-toast";
import { useLogoutUser } from "@/api/userApi.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate: logoutUser } = useLogoutUser();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    logoutUser(null, {
      onSuccess: () => {
        setUser(null);
        toast.success("Logged out successfully");
        navigate("/");
      },
      onError: (error) => {
        toast.error("Logout failed: " + error.message);
      },
    });
  };

  return user ? (
    <div className="flex justify-between p-4 sticky top-0 bg-amber-900/30 shadow-md backdrop-blur-3xl text-amber-950">
      <h1
        onClick={() => navigate("/")}
        className="font-bold text-3xl cursor-pointer"
      >
        Shopify
      </h1>
      <div className="hidden sm:flex gap-8 mt-2">
        {user.isAdmin == false && (
          <>
            <ul className="flex gap-10 font-semibold">
              <li className="cursor-pointer" onClick={() => navigate("/")}>Home</li>
              <li className="cursor-pointer" onClick={() => navigate("/item")}>Shop now</li>
            </ul>
            <img
              src="https://img.icons8.com/?size=100&id=85080&format=png&color=451a03"
              className="w-6 h-6 cursor-pointer"
              alt=""
            />
          </>
        )}
        <User
          className="rounded-full border-amber-950 border-2"
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        />
      </div>

      <div className="sm:hidden flex gap-8 mt-2">
        <img
          src="https://img.icons8.com/?size=100&id=85080&format=png&color=451a03"
          className="w-6 h-6 cursor-pointer"
          alt=""
        />
        <User
          className="rounded-full border-amber-950 border-2"
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        />
        {isMenuOpen ? (
          <X onClick={() => setIsMenuOpen(!isMenuOpen)} />
        ) : (
          <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
        )}

        {isMenuOpen && (
          <>
            <ul className="flex flex-col p-4 gap-4 absolute top-16 right-4 bg-white border border-gray-200 rounded-md shadow-lg w-40">
              <li className="cursor-pointer" onClick={() => navigate("/")}>Home</li>
              <li className="cursor-pointer" onClick={() => navigate("/item")}>Shop now</li>
            </ul>
          </>
        )}
      </div>
      {isProfileMenuOpen && (
        <>
          <ul className="flex flex-col p-4 gap-4 absolute top-16 right-5 bg-white border border-gray-200 rounded-md shadow-lg w-40">
            <li className="cursor-pointer" onClick={() => navigate("/profile")}>
              Profile
            </li>
            {user.isAdmin == false && (
              <li className="cursor-pointer">My Orders</li>
            )}
            <li className="cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </>
      )}
    </div>
  ) : (
    <div className="flex justify-between p-4 sticky top-0 bg-amber-900/30 shadow-md backdrop-blur-3xl text-amber-950">
      <h1
        onClick={() => navigate("/")}
        className="font-bold text-3xl cursor-pointer"
      >
        Shopify
      </h1>
      <div className="hidden sm:flex gap-8 mt-2 mr-4">
        <ul className="flex gap-4 font-semibold">
          <button
            onClick={() => navigate("/login")}
            className="bg-amber-950 text-white px-4 py-2 rounded-md"
          >
            login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="border border-amber-950 text-amber-950 px-4 py-2 rounded-md"
          >
            register
          </button>
        </ul>
      </div>

      <div className="sm:hidden flex gap-8 mt-2">
        {isMenuOpen ? (
          <X onClick={() => setIsMenuOpen(!isMenuOpen)} />
        ) : (
          <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
        )}

        {isMenuOpen && (
          <>
            <ul className="flex flex-col p-4 gap-4 absolute top-16 right-4 bg-white border border-gray-200 rounded-md shadow-lg w-40">
              <button
                onClick={() => navigate("/login")}
                className="bg-amber-950 text-white px-4 py-2 rounded-md"
              >
                login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="border border-amber-950 text-amber-950 px-4 py-2 rounded-md"
              >
                register
              </button>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
