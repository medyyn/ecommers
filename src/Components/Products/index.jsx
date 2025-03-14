import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Products = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [products, SetProducts] = useState([]);
  useEffect(() => {
    axios.get(url).then(({ data }) => {
      SetProducts(data);
    });
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-6 px-5">
      {products.map(({ id, title, category, price, description, images, slug }) => {
        return (
          <div
            key={id}
            className="border-1 border-gray-300 relative rounded-md"
          >
            <div
              alt={title}
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
            <Link to={"/products/" + slug} className="absolute inset-0"></Link>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
