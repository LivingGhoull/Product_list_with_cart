import productList from "../utility/productList.json";
import { changesToCart } from '../utility/changesToCart';

interface Props {
  productID: number;
  quantity: number;
}

function CartProduct(prop: Props) {  
  const desert = productList.deserts[prop.productID]

  return (
    <div className="cart-product">
      <div className="cart-product__container">
        <p className="cart-product__title">{desert.title}</p>

        <div className="cart-product__details">
          <p className="cart-product__quantity">{prop.quantity}x</p>
          <p className="cart-product__price">${desert.price}</p>
          <p className="cart-product__total-price">${(parseFloat(desert.price) * prop.quantity).toFixed(2)}</p>
        </div>
      </div>

      <button type="button" onClick={() => changesToCart(prop.productID, (prop.quantity - 1))} className="cart-product__remove-button">
        <img src="src\assets\images\icon-remove-item.svg" alt="" />
      </button>
    </div>
  );
}

export default CartProduct;