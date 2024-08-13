import { useState } from "react";
import { removeOrder } from "./utility/changesToCart";

import Cart from "./components/Cart";
import ConfirmOrder from "./components/ConfirmOrder";
import ProductList from "./components/ProductList";

function App() {
  const [isOrderConfirm, setIsOrderConfirm] = useState<boolean>(false);

  const handleOrderToggle = (newOrder?: boolean) => {
    if (newOrder === true) {
      removeOrder()
    }
    setIsOrderConfirm(!isOrderConfirm);
  };

  return (
    <main className={isOrderConfirm ? "container freeze-screen" : "container"}>
      {isOrderConfirm && (
        <div className="order-confirmed">
          <ConfirmOrder handleOrderToggle={handleOrderToggle} />
        </div>
      )}

      <div className="main-content">
        <div>
          <h1 className="main-content__title">Desserts</h1>
          <ProductList />
        </div>
        <Cart handleOrderToggle={handleOrderToggle} />
      </div>
    </main>
  );
}

export default App;
