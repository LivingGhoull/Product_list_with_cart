import { useEffect, useState } from "react";
import { changesToCart, getDateFromCart } from '../utility/changesToCart';

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
      setProductsInCart(await getDateFromCart(prop.id))
    }
    fetchProductInChart()
  }, [])

  useEffect(() => {
    prop.handleIsProductInCart(productsInCart > 0);
  }, [productsInCart]);

  const updateQuantity = () => {       
    const getItem = localStorage.getItem("cartList") || "[]";
    const prasedItems: CartJson[] = JSON.parse(getItem);
   
    const product = prasedItems.find((product) => product.productID == prop.id) 

    if (product) {
      setProductsInCart(product.quantity)
    } else {
      setProductsInCart(0)
    }
  }

  useEffect(() => {
    window.addEventListener("productCountUpdate", updateQuantity);
    return () => {
      window.removeEventListener("productCountUpdate", updateQuantity)
    }
  },[])


  const handleIncreaseProduct = () => {
    setProductsInCart(productsInCart + 1);
    changesToCart(prop.id, (productsInCart + 1))
  };

  const handleDecreaseProduct = () => {
    setProductsInCart(productsInCart - 1);
    changesToCart(prop.id, (productsInCart - 1))
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
              src="src\assets\images\icon-add-to-cart.svg"
              alt="Add to shopping cart"
            />
            Add To Cart
          </button>
        ) : (
          <div className="add-to-cart__additional">
            <button type="button" onClick={handleDecreaseProduct}>
              <img src="src\assets\images\icon-decrement-quantity.svg" alt="decrease quantitiy by one" />
            </button>
            <p className="add-to-cart__quantity">{productsInCart}</p>
            <button type="button" onClick={handleIncreaseProduct}>
              <img src="src\assets\images\icon-increment-quantity.svg" alt="increase quantitiy by one" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AddToCartButton;
