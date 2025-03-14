import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Loading from "../Loading";
const Products = ({ searchedText, activeCategory, setActiveCategory }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [products, SetProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(8);
  const [pages, SetPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        SetProducts(data);
        setFilteredProducts(data);
        SetPages(Math.ceil(data.length / count));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.status === 404) {
          toast.error("backend ilə bağlı problem!");
        }
      });
  }, []);

  useEffect(() => {
    setEndIndex(startIndex + count);
  }, [startIndex]);

  useEffect(() => {
    setStartIndex((activePage - 1) * count);
    setEndIndex(activePage * count);
  }, [activePage]);

  useEffect(() => {
    if ( activeCategory.toLowerCase() === "all"){
      SetPages(Math.ceil(products.length / count));
      setFilteredProducts(products);
      setActivePage(1);
    }else{
      const filteredData = products.filter(({ category }) => {
        return category.name.toLowerCase() === activeCategory.toLowerCase();
      });
      SetPages(Math.ceil(filteredData.length / count));
      setFilteredProducts(filteredData);
      setActivePage(1);
    }
  },[activeCategory])

  useEffect(() => {
    const filteredData = products.filter(({ title }) => {
      return title.toLowerCase().includes(searchedText.toLowerCase());
    });
    SetPages(Math.ceil(filteredData.length / count));
    setFilteredProducts(filteredData);
    setActivePage(1);
    setActiveCategory("All")
  }, [searchedText]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-6 px-5">
          {filteredProducts
            .slice(startIndex, endIndex)
            .map(
              ({ id, title, category, price, description, images, slug }) => {
                return (
                  <div
                    key={id}
                    className="border-1 border-gray-300 relative rounded-md"
                  >
                    <div
                      className="object-cover w-full h-[200px] rounded-tl-md rounded-tr-md bg-center bg-no-repeat bg-cover"
                      style={{ backgroundImage: `url(${images[0]})` }}
                    />
                    <div className="p-2">
                      <h2 className="truncate font-bold">{title}</h2>
                      <h2 className="absolute top-2 right-2 bg-red-300 px-2 py-0.5 font-sm rounded-md">
                        {category.name}
                      </h2>
                      <p className="my-2 line-clamp-2">{description}</p>
                      <p className="truncate font-bold text-red-600 text-xl">
                        {price} AZN
                      </p>
                    </div>
                    <Link
                      to={"/products/" + slug}
                      className="absolute inset-0"
                    ></Link>
                  </div>
                );
              }
            )}
        </div>
      ) : (
        <h2 className="text-2xl mt-4 ml-3.5 font-bold text-red-600 bg-gray-100 p-4 rounded-lg shadow-md">
          İstədiyiniz məlumat tapılmadı
        </h2>
      )}
      <div className="flex justify-center items-center space-x-2 mt-4 mx-auto">
        {new Array(pages).fill("").map((_, index) => {
          return (
            <div
              className={`w-10 h-10 flex items-center justify-center text-white rounded-full text-lg font-semibold cursor-pointer 
        hover:bg-slate-500 transition-all duration-300 shadow-md 
        ${activePage === index + 1 ? "bg-slate-900" : "bg-gray-600"}`}
              onClick={() => {
                setActivePage(index + 1);
              }}
              key={index}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
