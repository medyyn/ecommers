import React, { useState } from "react";
import Navbar from "../../Components/Layout/Navbar";
import Products from "../../Components/Products";
import Categories from "../../Components/Categories";

const Home = () => {
  const [searchedText, setSearchedText] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <>
      <Navbar searchedText={searchedText} setSearchedText={setSearchedText} />
      <div className="px-5 grid grid-cols-[200px_1fr]">
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Products
          searchedText={searchedText}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
    </>
  );
};

export default Home;
