import { useEffect, useState } from "react";
import { changesToCart, getDateFromCart } from "../utility/changesToCart";

interface Props {
  id: number;
  handleIsProductInCart: (value: boolean) => void;
}
interface CartJson {
  productID: number;
  quantity: number;
}

function AddToCartButton(prop: Props) {
  const [productsInCart, setProductsInCart] = useState<number>(0);

  useEffect(() => {
    const fetchProductInChart = async () => {
      setProductsInCart(await getDateFromCart(prop.id));
    };
    fetchProductInChart();
  }, []);

  useEffect(() => {
    prop.handleIsProductInCart(productsInCart > 0);
  }, [productsInCart]);

  const updateQuantity = () => {
    const getItem = localStorage.getItem("cartList") || "[]";
    const prasedItems: CartJson[] = JSON.parse(getItem);

    const product = prasedItems.find((product) => product.productID == prop.id);

    if (product) {
      setProductsInCart(product.quantity);
    } else {
      setProductsInCart(0);
    }
  };

  useEffect(() => {
    window.addEventListener("productCountUpdate", updateQuantity);
    return () => {
      window.removeEventListener("productCountUpdate", updateQuantity);
    };
  }, []);

  const handleIncreaseProduct = () => {
    setProductsInCart(productsInCart + 1);
    changesToCart(prop.id, productsInCart + 1);
  };

  const handleDecreaseProduct = () => {
    setProductsInCart(productsInCart - 1);
    changesToCart(prop.id, productsInCart - 1);
  };

  return (
    <>
      <div className="add-to-cart">
        {productsInCart <= 0 ? (
          <button
            type="button"
            onClick={handleIncreaseProduct}
            className="add-to-cart__add-first"
          >
            <img
              src="images\icon-add-to-cart.svg"
              alt="Add to shopping cart"
            />
            Add To Cart
          </button>
        ) : (
          <div className="add-to-cart__additional">
            <button aria-label="Decrease quantity of product" type="button" onClick={handleDecreaseProduct}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="none"
                viewBox="0 0 10 2"
              >
                <path fill="currentColor" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>
            <p className="add-to-cart__quantity">{productsInCart}</p>
            <button aria-label="Increase quantity of product" type="button" onClick={handleIncreaseProduct}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="currentColor"
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AddToCartButton;
