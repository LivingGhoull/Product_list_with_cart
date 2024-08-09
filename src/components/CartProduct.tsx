import productList from "../utility/productList.json";
import { changesToCart } from "../utility/changesToCart";

interface Props {
  productID: number;
  quantity: number;

  isOrderConfirmed?: boolean;
}

function CartProduct(prop: Props) {
  const desert = productList.deserts[prop.productID];

  return (
    <div className="cart-product">
      <div
        className={
          prop.isOrderConfirmed
            ? "cart-product__order-product-confirm"
            : "cart-product__order-product"
        }
      >
        {prop.isOrderConfirmed && (
          <img
            className="cart-product__product-img"
            src={productList.deserts[prop.productID].images.thumbnail}
            alt={productList.deserts[prop.productID].alt}
          />
        )}
        <div className="cart-product__container">
          <p className="cart-product__title">{desert.title}</p>
          <div className="cart-product__details">
            <p className="cart-product__quantity">{prop.quantity}x</p>
            <p className="cart-product__price">${desert.price}</p>
            {!prop.isOrderConfirmed && (
              <p className="cart-product__total-price">
                ${(parseFloat(desert.price) * prop.quantity).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>

      {prop.isOrderConfirmed ? (
        <p className="cart-product__total-price">
          ${(parseFloat(desert.price) * prop.quantity).toFixed(2)}
        </p>
      ) : (
        <button
          type="button"
          onClick={() => changesToCart(prop.productID, prop.quantity - 1)}
          className="cart-product__remove-button"
        >
          <img
            src="src\assets\images\icon-remove-item.svg"
            alt="Decrease the quantity of the product by one"
          />
        </button>
      )}
    </div>
  );
}

export default CartProduct;
