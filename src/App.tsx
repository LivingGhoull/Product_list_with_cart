import Cart from "./components/Cart";
import Product from "./components/Product";
import productList from "./utility/productList.json";

function App() {
  return (
    <main>
      <h1>Desserts</h1>

      {productList.deserts.map((product, index) => (
        <div key={index}>
          <Product
            type={product.type}
            title={product.title}
            price={product.price}
          />
        </div>
      ))}

      <Cart />
    </main>
  );
}

export default App;
