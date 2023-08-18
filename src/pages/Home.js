import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import backendUrl from "../static/constants";

function Home() {
  const param = useParams();
  const searchText = useSelector((state) => state.search);
  const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  const page = useRef(1);
  const hasMore = useRef(true);

  const getData = useCallback(async () => {
    try {
      // const response = await fetch(backendUrl + "product");
      const response = await fetch(
        `${backendUrl}product?page=${page.current}&search=${searchText}`
      );
      const results = await response.json();
      // console.log(results);
      // if (response.status === 200) setData(results);
      if (response.status === 404) hasMore.current = false;
      if (response.status === 200) setData((state) => [...state, ...results]);
      else
        toast("Could not fetch Products data\n" + results.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
    } catch (err) {
      toast("Could not fetch Products data.\n" + err.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }, [page, searchText]);

  const observer = useRef();
  const scrollerRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // console.log("Visible");
          if (hasMore.current) getData();
          page.current += 1;
        }
      });
      if (node) observer.current.observe(node);
    },
    [getData]
  );

  useEffect(() => {
    page.current = 1;
    hasMore.current = true;
    setData([]);
  }, [searchText]);

  return (
    <div className="px-8 py-4">
      <ToastContainer />
      <div className="flex flex-wrap justify-center ">
        {data
          .filter((product) => {
            return (
              !param?.type ||
              param.type.toLowerCase() === product.category.toLowerCase()
            );
          })
          .map((product, index) => (
            <div className="w-[100%] p-4 sm:w-[50%] lg:w-[300px]" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
      </div>
      <div ref={scrollerRef}></div>
    </div>
  );
}

export default Home;
