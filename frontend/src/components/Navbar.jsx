import React from "react";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-4 sticky top-0 bg-amber-900/30 shadow-md backdrop-blur-3xl text-amber-950">
      <h1 onClick={() => navigate('/')} className="font-bold text-3xl cursor-pointer">Shopify</h1>
      <div className="hidden md:flex gap-8 mt-2">
        <ul className="flex gap-10 font-semibold">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Shop now</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
        <div className="flex gap-1 cursor-pointer">
          <span>Search</span>
          <img
            src="https://img.icons8.com/?size=100&id=59878&format=png&color=451a03"
            className="w-6 h-6"
            alt=""
          />
        </div>
        <img
          src="https://img.icons8.com/?size=100&id=85080&format=png&color=451a03"
          className="w-6 h-6 cursor-pointer"
          alt=""
        />
      </div>

      <div className="md:hidden flex gap-8 mt-2">
        <div className="flex gap-1 cursor-pointer">
          <span>Search</span>
          <img
            src="https://img.icons8.com/?size=100&id=59878&format=png&color=451a03"
            className="w-4 h-4 mt-1"
            alt=""
          />
        </div>
        <img
          src="https://img.icons8.com/?size=100&id=85080&format=png&color=451a03"
          className="w-6 h-6 cursor-pointer"
          alt=""
        />
        {isMenuOpen ? (
          <X onClick={() => setIsMenuOpen(!isMenuOpen)} />
        ) : (
          <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
        )}

        {isMenuOpen && (
          <>
            <ul className="flex flex-col p-4 gap-4 absolute top-16 right-4 bg-white border border-gray-200 rounded-md shadow-lg w-40">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">Shop now</li>
              <li className="cursor-pointer">About</li>
              <li className="cursor-pointer">Contact</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
