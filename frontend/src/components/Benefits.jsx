import React from "react";

const Benefits = () => {
  return (
    <div className="bg-amber-950/30 flex justify-around pt-20 shadow-2xl pb-20 flex-wrap gap-10">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2769/2769339.png"
          className="bg-white rounded-xl h-[70px] w-[70px]"
          alt=""
        />
        <h2 className="pt-6 font-semibold text-xl text-left mb-2">
          Free Shipping
        </h2>
        <p>
          On orders over ₹2000. Fast and reliable <br /> delivery to your
          doorstep.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/128/18810/18810257.png"
          className="bg-white rounded-xl h-[70px] w-[70px]"
          alt=""
        />
        <h2 className="pt-6 font-semibold text-xl text-left mb-2">
          Quality Assured
        </h2>
        <p>
          Premium materials and expert <br /> craftsmanship on every product.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/128/18858/18858295.png"
          className="bg-white rounded-xl h-[70px] w-[70px]"
          alt=""
        />
        <h2 className="pt-6 font-semibold text-xl text-left mb-2">
          Easy Returns
        </h2>
        <p>
          30-day return policy for complete peace <br /> of mind with your purchase.
        </p>
      </div>
    </div>
  );
};

export default Benefits;
