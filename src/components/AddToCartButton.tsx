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
      <div className="add-to-cart">
        {productsInCart <= 0 ? (
          <button
            type="button"
            onClick={handleIncresseProduct}
            className="add-to-cart__add-first"
          >
            <img
              src="src\assets\images\icon-add-to-cart.svg"
              alt="Add to the shoppign cart"
            />
            Add To Cart
          </button>
        ) : (
          <div className="add-to-cart__additional">
            <button type="button" className="" onClick={handleDecresseProduct}>
              <img src="src\assets\images\icon-decrement-quantity.svg" alt="" />
            </button>
            <p className="add-to-cart__quantity">{productsInCart}</p>
            <button type="button" className="" onClick={handleIncresseProduct}>
              <img src="src\assets\images\icon-increment-quantity.svg" alt="" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default AddToCartButton;
