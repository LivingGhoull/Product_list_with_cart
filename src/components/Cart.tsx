import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import productList from "../utility/productList.json";

interface CartJson {
  productID: number;
  quantity: number;
}

interface Props {
  handleOrderToggle: () => void;
}

function Cart(prop: Props) {
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);
  const [itemsInCart, setItemsInCart] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<string>("0");
  const [itemsArray, setItemsArray] = useState<CartJson[]>([]);

  const cartUpdate = () => {
    const getItem = localStorage.getItem("cartList") || "[]";
    const prasedItems: CartJson[] = JSON.parse(getItem);

    if (prasedItems.length > 0) {
      let fullPrice = "0";
      let totalItems = 0;
      prasedItems.forEach((product) => {
        fullPrice = (
          parseFloat(fullPrice) +
          parseFloat(productList.deserts[product.productID].price) *
            product.quantity
        ).toFixed(2);
        totalItems += product.quantity;
      });

      setTotalPrice(fullPrice);
      setIsCartEmpty(false);
      setItemsInCart(totalItems);
      setItemsArray(prasedItems);
    } else {
      setIsCartEmpty(true);
      setItemsInCart(0);
    }
  };

  useEffect(() => {
    window.addEventListener("cartUpdate", cartUpdate);
    window.dispatchEvent(new Event("cartUpdate"));
    return () => {
      window.removeEventListener("cartUpdate", cartUpdate);
    };
  }, []);

  return (
    <div className="cart">
      <h2 className="cart__title">Your Cart ({itemsInCart})</h2>

      {isCartEmpty ? (
        <div className="cart__items">
          <img
            src="src\assets\images\illustration-empty-cart.svg"
            alt="Empty shopping cart"
          />
          <p className="cart__description">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <div className="cart__produt-list">
            {itemsArray.map((product, index) => (
              <CartProduct
                key={index}
                productID={product.productID}
                quantity={product.quantity}
              />
            ))}
          </div>
          <div className="cart__info">
            <div className="cart__total">
              <p>Order Total</p>
              <h2 className="cart__total__price">${totalPrice}</h2>
            </div>

            <div className="cart__carbon-neutral">
              <img src="src\assets\images\icon-carbon-neutral.svg" alt="Carbon neutral icon" />
              <p>
                This is a <span>carbon-neutral</span> delivery
              </p>
            </div>

            <button
              type="button"
              className="cart__confirm"
              onClick={prop.handleOrderToggle}
              aria-label=""
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
