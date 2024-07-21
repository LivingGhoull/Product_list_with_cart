import React from "react";

interface Props {
  title: string;
  type: string;
  price: string;
}

function Product(prop: Props) {
  return <>
    <p>{prop.type}</p>
    <p>{prop.title}</p>
    <p>{prop.price}</p>  
  </>;
}

export default Product;
