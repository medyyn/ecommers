import React from "react";
import Navbar from "../../Components/Layout/Navbar";
import UseBasket from "../../Store/BAsket";
import { FaTrash } from "react-icons/fa";

const Basket = () => {
  const { basket, changeProductCount } = UseBasket();
  return (
    <div>
      <Navbar />
      <div className="px-5">
        <h2 className="text-5xl font-bold my-8">My Basket</h2>
        {!basket.length ? (
          <p className="text-red-500 text-2xl">basket is empty</p>
        ) : (
          <div>
            {basket.map(({ id, images, title, price, description, count, totalPrice }) => {
              return (
                <div
                  key={id}
                  className="grid grid-cols-[1fr_4fr] gap-8 border-2 border-gray-300 p-2"
                >
                  <div>
                    <img src={images[0]} className="w-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-slate-700">
                      {title}
                    </h2>
                    <p className="text-gray-700 my-3 text-xl">{description}</p>
                    <p className="text-3xl font-bold text-red-500">${price}</p>
                    <div className="flex my-3 items-center space-x-4 border border-gray-300 rounded-lg p-2 w-fit bg-white shadow-md">
                      <button onClick={() => changeProductCount(id, "-")}  className="cursor-pointer px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-semibold rounded-md">
                        -
                      </button>
                      <span className="text-xl font-medium">{count}</span>
                      <button onClick={() => changeProductCount(id, "+")} className="cursor-pointer px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-semibold rounded-md">
                        +
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                    <p className="text-xl">Total Price: {totalPrice}$</p>
                    <div>
                        <FaTrash/>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
