import React from "react";

const Feature = () => {
  return (
    <div className="text-amber-950 bg-amber-950/10 items-center flex flex-col shadow-2xl">
      <div className="text-center pt-40 flex flex-col gap-4">
        <p className="">CURATED SELECTION</p>
        <h1 className="text-4xl font-bold">Featured Products</h1>
        <p>
          Step into style with our exclusive range of timeless fashion pieces.
        </p>
      </div>
      <div className="flex pt-20 gap-18 pb-10 mx-auto justify-center flex-wrap">
        <div className="bg-amber-950/90 rounded-3xl font-semibold shadow-lg text-white">
          <img
            className="w-[250px] h-[250px] rounded-t-2xl"
            src="https://media.istockphoto.com/id/185074737/photo/woman-dress.jpg?s=612x612&w=0&k=20&c=85Yz8jbxKZYDpsfC1ZqOZh06j3gBRaN8L9spKzBmfC8="
            alt=""
          />
          <div className="p-5">
            <h2>Black one piece</h2>

            <div className="flex justify-between">
              <p>₹ 800</p>
              <img
                src="https://img.icons8.com/?size=100&id=85080&format=png&color=ffffff"
                className="w-6 h-6"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="bg-amber-950/90 rounded-3xl font-semibold shadow-lg text-white">
          <img
            className="w-[250px] h-[250px] rounded-t-2xl"
            src="https://media.istockphoto.com/id/1140986980/photo/coral-trendy-color-long-sleeved-sweater-on-a-mannequin-isolated.jpg?s=612x612&w=0&k=20&c=IYuJ5gTwF2hF53yETSiVbZBy4aWI2k3R297gbanWmgw="
            alt=""
          />
          <div className="p-5">
            <h2>Long-seeved sweater</h2>

            <div className="flex justify-between">
              <p>₹ 600</p>
              <img
                src="https://img.icons8.com/?size=100&id=85080&format=png&color=ffffff"
                className="w-6 h-6"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="bg-amber-950/90 rounded-3xl font-semibold shadow-lg text-white">
          <img
            className="w-[250px] h-[250px] rounded-t-2xl"
            src="https://media.istockphoto.com/id/165434251/photo/pink-evase-strapless-dress.jpg?s=612x612&w=0&k=20&c=zZ_ekW9zAYvGLGLaOH6nqczWzaZZ0wdwvP8VBKRCXGA="
            alt=""
          />
          <div className="p-5">
            <h2>Strapless one piece</h2>

            <div className="flex justify-between">
              <p>₹ 1000</p>
              <img
                src="https://img.icons8.com/?size=100&id=85080&format=png&color=ffffff"
                className="w-6 h-6"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="bg-amber-950/90 rounded-3xl font-semibold shadow-lg text-white">
          <img
            className="w-[250px] h-[250px] rounded-t-2xl"
            src="https://media.istockphoto.com/id/1402881348/photo/women-jacket-in-a-hood-isolated-on-a-white-background-windbreaker-jacket-casual-style.jpg?s=612x612&w=0&k=20&c=WjuCwRuOcDHQAVOgf2cvT4fASRXx3aTdLC6idMfIwao="
            alt=""
          />
          <div className="p-5">
            <h2>Blue Jacket</h2>

            <div className="flex justify-between">
              <p>₹ 1800</p>
              <img
                src="https://img.icons8.com/?size=100&id=85080&format=png&color=ffffff"
                className="w-6 h-6"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <button className="mb-40 bg-amber-950 text-white px-12 py-2 rounded-xl flex gap-4">View all products <img src="https://images.icon-icons.com/1993/PNG/512/arrow_arrows_back_direction_left_navigation_right_icon_123236.png" className='h-5 w-5 invert mt-1'  alt="" /></button>
    </div>
  );
};

export default Feature;
