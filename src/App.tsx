import { useEffect, useState } from "react";

import Cart from "./components/Cart";
import Product from "./components/Product";
import productList from "./utility/productList.json";

import WindowWidth from "./hooks/WindowWidth";

function App() {
  const getWindowsWidth = WindowWidth()
  const [screenType, setScreenType] = useState("mobile");


  useEffect(() => {
    if (getWindowsWidth >= 1440) {
      setScreenType("desktop")
    } else if(getWindowsWidth >= 786) {
      setScreenType("tablet")
    } else {
      setScreenType("mobile")
    }
  }, [getWindowsWidth])

  return (
    <main>
      <h1>Desserts</h1>

      {productList.deserts.map((product, index) => (
        <div key={index}>
          <Product
            src={
              screenType == "desktop"
                ? product.images.desktop
                : screenType == "tablet"
                ? product.images.desktop
                : product.images.mobile
            }
            alt={product.alt}
            type={product.type}
            title={product.title}
            price={product.price}
          />
        </div>
      ))}

      <Cart />
    </main>
  );
}

export default App;
