import { useState } from "react";
import AddToCart from "./AddToCart";


interface Props {
  id: number;
  title: string;
  type: string;
  price: string;

  src: string;
  alt: string;
}

function Product(prop: Props) {
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);


  const handleIsProductInCart = (value: boolean) => {
    setIsProductInCart(value);
  };

  

  return (
    <div className="products__card">
      <div className="products__position">
        <img
          className={
            isProductInCart
              ? "products__img products__img--outline"
              : "products__img"
          }
          src={prop.src}
          alt={prop.alt}
        />
        <AddToCart
          id={prop.id}
          handleIsProductInCart={(value) => handleIsProductInCart(value)}
        />
      </div>
      <div>
        <p className="products__type">{prop.type}</p>
        <h6 className="products__title">{prop.title}</h6>
        <p className="products__price">{prop.price}</p>
      </div>
    </div>
  );
}

export default Product;
