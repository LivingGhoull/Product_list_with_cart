import { useEffect, useState } from "react";

import Cart from "./components/Cart";
import Product from "./components/Product";
import ConfirmOrder from "./components/ConfirmOrder";
import productList from "./utility/productList.json";

import useWindowWidth from "./hooks/useWindowWidth";

function App() {
  const getWindowsWidth = useWindowWidth();
  const [screenType, setScreenType] = useState<string>("mobile");
  const [isOrderConfirm, setIsOrderConfirm] = useState<boolean>(false);

  useEffect(() => {
    if (getWindowsWidth >= 1440) {
      setScreenType("desktop");
    } else if (getWindowsWidth >= 786) {
      setScreenType("tablet");
    } else {
      setScreenType("mobile");
    }
  }, [getWindowsWidth]);

  const handleOrderToggle = () => {
    setIsOrderConfirm(!isOrderConfirm);
  };

  return (
    <main className={isOrderConfirm ? "container freeze-screen" : "container"}>
      {isOrderConfirm && (
        <div className="order-confirmed">
          <ConfirmOrder handleOrderToggle={handleOrderToggle} />
        </div>
      )}

      <div className="gird-display">
        <div>
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
        </div>
        <Cart handleOrderToggle={handleOrderToggle} />
      </div>
    </main>
  );
}

export default App;
