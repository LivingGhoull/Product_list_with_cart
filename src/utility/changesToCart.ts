interface CartJson {
  productID: number;
  quantity: number;
}

//Gets the local storage with cart data and see if the product exist in the cart
const productNeeded = (productID: number) => {
  const getItem = localStorage.getItem("cartList") || "[]";
  let cartList: CartJson[];

  cartList = JSON.parse(getItem);

  const product = cartList.find(
    (product: CartJson) => product.productID == productID
  );

  return {product, cartList};
}

//Gives the data for eatch product to if it exist in the local stograge
export const getDateFromCart = async (productID: number) => {
  const product = await productNeeded(productID).product
  return product ? product.quantity : 0;
};

//Changes the number of the product in the cart
export const changesToCart = async (productID: number, quantity: number) => {
  const {product, cartList} = await productNeeded(productID)

  const productIndex = cartList.findIndex((product) => product.productID == productID )
  
  if (product) {
    cartList[productIndex].quantity = quantity
  } else {
    cartList.push({ productID, quantity });
  }


  if (quantity == 0) {
    const newCartList = cartList.filter(
      (product) => product.quantity != 0
    );
    localStorage.setItem("cartList", JSON.stringify(newCartList));
  } else {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }

  window.dispatchEvent(new Event("cartUpdate"))
};
