import axios from "axios";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const url = import.meta.env.VITE_CATEGORIES_URL;
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get(url).then(({data}) => {
        setCategories(data)
    })
  },[])
  return <div className="mt-5">
    {
        categories.map(({id,name}) => {
            return <div key={id}>
                {name}
            </div>
        })
    }
  </div>;
};

export default Categories;
