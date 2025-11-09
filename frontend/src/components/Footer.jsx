import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="text-white bg-amber-950/50 text-center pt-40 pb-20 shadow-2xl">
        <h1 className="text-4xl font-bold pb-5">Subscribe to Our Newsletter</h1>
        <p>
          Join our fashion circle and be the first to discover new arrivals,
          limited-time deals, and style inspiration curated <br /> just for you.
        </p>
        <div className="">
          <input
            type=""
            className="bg-white p-2 mt-10 w-50 sm:w-100 md:w-150 text-gray-900 rounded justify-center mx-auto"
            placeholder="Enter your email"
          />
          <button className="bg-amber-950/95 py-2 px-4 ml-2 rounded">
            Subscribe
          </button>
        </div>
      </div>

      <div className="bg-amber-950/90 text-white">
        <div className="flex gap-10 justify-around pt-20 flex-wrap">
          <div>
            <h1 className="font-bold text-2xl mb-4">Shopify</h1>
            <p>
              Elevate your everyday style with timeless <br /> fashion crafted
              for the modern you.
            </p>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-4">Shop</h1>
            <div className="flex flex-col gap-1">
              <p>Collections</p>
              <p>New Arrivals</p>
              <p>Sale</p>
              <p>Clearance</p>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-4">Support</h1>
            <div className="flex flex-col gap-1">
              <p>Contact us</p>
              <p>Shipping Info</p>
              <p>Returns</p>
              <p>FAQ</p>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl mb-4">Follow</h1>
            <div className="flex gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/128/49/49004.png"
                alt=""
                className="w-6 h-6 invert"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/1384/1384031.png"
                alt=""
                className="w-6 h-6 invert"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/128/733/733635.png"
                alt=""
                className="w-6 h-6 invert"
              />
            </div>
          </div>
        </div>
        <hr className="mx-5 my-10"/>
        <div className="flex justify-between mx-15">
          <p>© 2025 Shopify. All rights reserved.</p>
          <div className="sm:flex gap-4 pb-15">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Cookie Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
