interface Props {
  title: string;
  type: string;
  price: string;

  src: string;
  alt: string;
}

function Product(prop: Props) {
  return (
    <div className="products__card">
      <img src={prop.src} alt={prop.alt} />
      <div>
        <p className="products__type">{prop.type}</p>
        <h6 className="products__title">{prop.title}</h6>
        <p className="products__price">{prop.price}</p>
      </div>
    </div>
  );
}

export default Product;
