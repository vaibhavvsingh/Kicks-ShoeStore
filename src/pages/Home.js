import React from "react";
import ProductCard from "../components/ProductCard";
import { data } from "../mock/products";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Home() {
  const param = useParams();
  // console.log(param);
  const searchText = useSelector((state) => state.search);
  // console.log(searchText)
  let filteredData = data.hydratedProducts;

  if (param?.type === "footwear") {
    filteredData = data.hydratedProducts.filter(
      (product) => product.category === "FOOTWEAR"
    );
  }
  if (param?.type === "apparel") {
    filteredData = data.hydratedProducts.filter(
      (product) => product.category === "APPAREL"
    );
  }
  if (param?.type === "accessories") {
    filteredData = data.hydratedProducts.filter(
      (product) => product.category === "ACCESSORIES"
    );
  }

  return (
    <div className="px-8 py-4">
      {/* <div className='text-xs mb-4 sticky top-[7.6rem]'>
        SORT BY
      </div> */}
      <div className="flex flex-wrap justify-center ">
        {searchText === ""
          ? filteredData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : filteredData
              .filter((product) =>
                product.name
                  .replaceAll("-", " ")
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
      </div>
    </div>
  );
}

export default Home;
