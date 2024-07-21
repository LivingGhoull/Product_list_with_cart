interface Props {
  title: string;
  type: string;
  price: string;
  
  src: string;
  alt: string;
}

function Product(prop: Props) {
  return <>
    <img src={prop.src} alt={prop.alt} />
    <p>{prop.type}</p>
    <p>{prop.title}</p>
    <p>{prop.price}</p>  
  </>;
}

export default Product;
