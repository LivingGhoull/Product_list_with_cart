import { useEffect, useState } from "react";

import Product from "./Product";
import productData from "../utility/productList.json";
import useWindowWidth from "../hooks/useWindowWidth";

function ProductList() {
  const getWindowsWidth = useWindowWidth();
  const [screenType, setScreenType] = useState<string>("mobile");

  useEffect(() => {
    if (getWindowsWidth >= 1440) {
      setScreenType("desktop");
    } else if (getWindowsWidth >= 786) {
      setScreenType("tablet");
    } else {
      setScreenType("mobile");
    }
  }, [getWindowsWidth]);
  
  return (
    <div className="products">
      {productData.deserts.map((product, index) => (
        <Product
          key={index}
          src={
            screenType == "desktop"
              ? product.images.desktop
              : screenType == "tablet"
              ? product.images.desktop
              : product.images.mobile
          }
          id={product.id}
          alt={product.alt}
          type={product.type}
          title={product.title}
          price={product.price}
        />
      ))}
    </div>
  );
}

export default ProductList;
