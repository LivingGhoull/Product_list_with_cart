import { useEffect, useState } from "react";

import Cart from "./components/Cart";
import Product from "./components/Product";
import productList from "./utility/productList.json";

import useWindowWidth from "./hooks/useWindowWidth";

function App() {
  const getWindowsWidth = useWindowWidth();
  const [screenType, setScreenType] = useState("mobile");

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
    <main className="container">
      <h1 className="title">Desserts</h1>

      <div className="products">
        {productList.deserts.map((product, index) => (
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

      <Cart />
    </main>
  );
}

export default App;
