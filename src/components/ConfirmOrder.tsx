import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import productList from "../utility/productList.json";

interface CartJson {
  productID: number;
  quantity: number;
}

interface Props {
  handleOrderToggle: (newOrder?: boolean) => void;}

function ConfirmOrder(prop: Props) {
  const [itemsArray, setItemsArray] = useState<CartJson[]>([]);
  const [totalPrice, setTotalPrice] = useState<string>("0");

  useEffect(() => {
    const getItem = localStorage.getItem("cartList") || "[]";
    const prasedItems: CartJson[] = JSON.parse(getItem);
    let price = "0"

    prasedItems.forEach((product) => {
      price = (
        parseFloat(price) +
        parseFloat(productList.deserts[product.productID].price) *
          product.quantity
      ).toFixed(2);
    })

    setTotalPrice(price);

    setItemsArray(prasedItems);
  }, []);

  return (
    <div className="order-confirmed__container container">
      <div>
        <img src="src\assets\images\icon-order-confirmed.svg" alt="The order has been confirmed" />
      </div>
      <div>
        <h2 className="order-confirmed__title">Order Confirmed</h2>
        <p className="order-confirmed__message">We hope you enjoy your food!</p>
      </div>

      <div className="order-confirmed__product-list">
        {itemsArray.map((product, index) => (
          <CartProduct
            key={index}
            productID={product.productID}
            quantity={product.quantity}
            isOrderConfirmed={true}
          />
        ))}
        <div className="order-confirmed__total-order">
          <p>Order Total</p>
          <p className="order-confirmed__full-price">{totalPrice}</p>
        </div>
      </div>

      <button className="order-confirmed__button" onClick={() => prop.handleOrderToggle(true)}>Start New Order</button>
    </div>
  );
}

export default ConfirmOrder;
