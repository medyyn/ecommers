import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Layout/Navbar";
import UseBasket from "../../Store/BAsket";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const Basket = () => {
  const [basketTotalPrice, setBasketTotalPrice] = useState(0);
  const { basket, changeProductCount, deleteProductFromBasket } = UseBasket();
  useEffect(() => {
    let sum = 0;
    basket.forEach(({ totalPrice }) => {
      sum += totalPrice;
    });
    setBasketTotalPrice(sum);
  }, [basket]);

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductFromBasket(id);

        Swal.fire(
          "Deleted!",
          "The product has been removed from the cart.",
          "success"
        );
      } else {
        Swal.fire("Cancelled", "The product remains in the cart 😊", "error");
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="px-5">
        <h2 className="text-4xl font-bold mt-5 mb-5">My Basket</h2>
        {!basket.length ? (
          <p className="text-red-500 text-2xl">basket is empty</p>
        ) : (
          <div>
            {basket.map(
              ({
                id,
                images,
                title,
                price,
                description,
                count,
                totalPrice,
              }) => {
                return (
                  <div
                    key={id}
                    className="grid grid-cols-[1fr_4fr] items-center my-2 gap-8 border-2 border-gray-300 p-2"
                  >
                    <div className="h-full">
                      <img
                        src={images[0]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-slate-700">
                        {title}
                      </h2>
                      <p className="text-gray-700 my-3 text-xl">
                        {description}
                      </p>
                      <p className="text-3xl font-bold text-red-500">
                        {price}$
                      </p>
                      <div className="flex my-3 items-center space-x-4 border border-gray-300 rounded-lg p-2 w-fit bg-white shadow-md">
                        <button
                          onClick={() => changeProductCount(id, "-")}
                          className="cursor-pointer px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-semibold rounded-md"
                        >
                          -
                        </button>
                        <span className="text-xl font-medium">{count}</span>
                        <button
                          onClick={() => changeProductCount(id, "+")}
                          className="cursor-pointer px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg font-semibold rounded-md"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xl">Total Price: {totalPrice}$</p>
                        <div>
                          <FaTrash
                            className="text-3xl cursor-pointer"
                            onClick={() => deleteProduct(id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
        {!!basket.length && (
          <div className="text-2xl font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-lg mb-2 shadow-md w-fit">
            Total: {basketTotalPrice}$
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
