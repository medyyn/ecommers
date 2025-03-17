import React, { useEffect, useState } from "react";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { SlBasket } from "react-icons/sl";
import { Link, NavLink } from "react-router";
import UseBasket from "../../../Store/BAsket";

const Navbar = ({ searchedText, setSearchedText }) => {
  const [showMobile, SetShowMobile] = useState(false);
  const { basket } = UseBasket();
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket))
  },[basket])
  const links = [
    { id: 0, title: "Home", path: "/" },
    { id: 1, title: "About", path: "/about" },
    { id: 2, title: "Services", path: "/services" },
    { id: 3, title: "Contact", path: "/contact" },
  ];
  return (
    <div
      className="flex justify-between bg-slate-600 h-[70px]
  items-center text-white px-5"
    >
      <div>
        <Link to="/" className="text-2xl font-bold">
          Medyn Boutique
        </Link>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        {links.map(({ id, title, path }) => {
          return (
            <NavLink
              key={id}
              className="relative before:content-[''] before:block before:w-[0%]
          before:h-[3px] before:rounded-2xl before:bg-white before:absolute before:bottom-[-5px]
          before:duration-500 hover:before:w-[100%]"
              to={path}
            >
              {title}
            </NavLink>
          );
        })}
      </div>
      <div className="hidden md:flex gap-14 items-center">
        <input
          id="input"
          type="text"
          placeholder="search"
          value={searchedText}
          className="px-3 py-[4px] border border-gray-300 rounded-2xl 
          focus:outline-none focus:ring-2 focus:ring-gray-500 
          focus:border-transparent transition-all duration-200 shadow-sm
          outline-0 placeholder:text-white"
          onChange={(e) => setSearchedText(e.target.value)}
        />
        <Link to="/basket" className="relative">
          <SlBasket className="text-3xl" />
          <span className="absolute top-[-15px] left-[-25px] bg-red-600 rounded-full w-6 h-6 flex justify-center items-center">
            {basket.length}
          </span>
        </Link>
      </div>
      <div
        className="block md:hidden cursor-pointer"
        onClick={() => {
          SetShowMobile(!showMobile);
        }}
      >
        {showMobile ? (
          <LiaTimesSolid className="text-3xl" />
        ) : (
          <HiBars3CenterLeft className=" text-3xl" />
        )}
      </div>
      {showMobile && (
        <div
          className="flex flex-col md:hidden absolute top-[70px] bg-slate-600
    text-white w-[300px] h-[calc(100vh-70px)] justify-center items-center gap-4 right-0 z-10"
        >
          {links.map(({ id, title, path }) => {
            return (
              <Link
                key={id}
                className="relative before:content-[''] before:block before:w-[0%]
          before:h-[3px] before:rounded-2xl before:bg-white before:absolute before:bottom-[-5px]
          before:duration-500 hover:before:w-[100%]"
                to={path}
              >
                {title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
