import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import backendUrl from "../static/constants";

function Home() {
  const param = useParams();
  const searchText = useSelector((state) => state.search);
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await fetch(backendUrl + "product");
      const results = await response.json();
      if (response.status === 200) setData(results);
      else
        toast("Could not fetch Products data\n" + results.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
    } catch (err) {
      toast("Could not fetch Products data.\n" + err.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  useEffect(() => {
    getData();
  }, [searchText]);

  return (
    <div className="px-8 py-4">
      <ToastContainer />
      <div className="flex flex-wrap justify-center ">
        {data
          .filter((product) => {
            return (
              product.name.toLowerCase().includes(searchText.toLowerCase()) &&
              (!param?.type ||
                param.type.toLowerCase() === product.category.toLowerCase())
            );
          })
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default Home;
