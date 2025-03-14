import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = ({ activeCategory, setActiveCategory }) => {
  const url = import.meta.env.VITE_CATEGORIES_URL;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(url).then(({ data }) => {
      setCategories(data);
    });
  }, []);
  return (
    <div className="mt-5">
      <div
        className={` p-2 mb-2 rounded-sm text-white 
        cursor-pointer ${
          activeCategory === "All" ? "bg-slate-800" : "bg-slate-600"
        }`}
        onClick={() => setActiveCategory("All")}
      >
        All
      </div>
      {categories.map(({ id, name}) => {
        return (
          <div
            key={id}
            className={` p-2 mb-2 rounded-sm 
            text-white cursor-pointer ${
              activeCategory === name ? "bg-slate-800" : "bg-slate-600"
            }`}
            onClick={() => setActiveCategory(name)}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
