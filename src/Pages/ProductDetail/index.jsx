import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Layout/Navbar";
import { useParams } from "react-router";
import axios from "axios";
import Rating from "../../Components/Rating";
import toast from "react-hot-toast";
import NotFound from "../../Components/NotFound";
import Loading from "../../Components/Loading";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, SetProduct] = useState({});
  const url = import.meta.env.VITE_BACKEND_URL;
  const [currentImage, setCurrentImage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        const currentElement = data.find((e) => e.slug === slug);
        SetProduct(currentElement);
        setCurrentImage(currentElement.images[0]);
        setIsLoading(false)
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          toast.error("Backend ilə bağlı problem!");
        }
      });
  }, []);
  if(isLoading) {
    return <Loading/>
  }
  return (
    <>
      <Navbar />
      {product.slug ? (
        <div className="grid grid-cols-2 px-5 gap-16 mt-4">
          <div className="border-2 border-gray-300 p-4 grid grid-cols-[3fr_1fr] gap-4">
            <img src={currentImage} alt="" className="w-full h-auto" />

            <div className="flex flex-col gap-2">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className="w-full h-auto
              cursor-pointer"
                  onClick={() => {
                    setCurrentImage(image);
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-slate-700">
              {product.title}
            </h2>
            <p className="text-gray-700 my-3 text-xl">{product.description}</p>
            <p className="text-3xl font-bold text-red-500">${product.price}</p>
            <Rating />
          </div>
        </div>
      ) : (
        <NotFound/>
      )}
    </>
  );
};

export default ProductDetail;
