import { useEffect, useState } from "react";
import { changesToCart, getDateFromCart } from '../utility/saveToCart';

interface Props {
  id: number;
  handleIsProductInCart: (value: boolean) => void;
}

function AddToCart(prop: Props) {  
  const [productsInCart, setProductsInCart] = useState<number>(0);

  useEffect(() => {
    const fetchProductInChart = async () => {
      setProductsInCart(await getDateFromCart(prop.id))
    }
    fetchProductInChart()
  }, [])

  useEffect(() => {
    prop.handleIsProductInCart(productsInCart > 0);
  }, [productsInCart]);

  const handleIncresseProduct = () => {
    setProductsInCart(productsInCart + 1);
    changesToCart(prop.id, (productsInCart + 1))
  };

  const handleDecresseProduct = () => {
    setProductsInCart(productsInCart - 1);
    changesToCart(prop.id, (productsInCart - 1))
  };

  return (
    <>
      <div className="addToCart">
        {productsInCart <= 0 ? (
          <button
            type="button"
            onClick={handleIncresseProduct}
            className="addToCart__add-first"
          >
            <img
              src="src\assets\images\icon-add-to-cart.svg"
              alt="Add to the shoppign cart"
            />
            Add To Cart
          </button>
        ) : (
          <div className="addToCart__additional">
            <button type="button" onClick={handleDecresseProduct}>
              <img src="src\assets\images\icon-decrement-quantity.svg" alt="" />
            </button>
            {productsInCart}
            <button type="button" onClick={handleIncresseProduct}>
              <img src="src\assets\images\icon-increment-quantity.svg" alt="" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AddToCart;
