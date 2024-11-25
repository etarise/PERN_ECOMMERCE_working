import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
import Login from "./components/Login";
//import Register from "./components/Register";
import NavBar from "./components/NavBar";
import NoMatch from "./components/NoMatch";
//import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import Details from "./components/ProductDetails";
import Cart from "./components/Cart";
import React, { useState } from "react";
import ProductList from "./components/ProductList";
//const PAGE_PRODUCTS = "products";
//const PAGE_CART = "cart";

function App() {
  const [cart, setCart] = useState([]);

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // create
  }, [cart]);

  const addToCart = (product) => {
    //console.log("we are in add to cart function");
    setCart([...JSON.parse(localStorage.cart), { ...product, quantity: 1 }]);
    console.log(JSON.parse(localStorage.cart));
  };

  // const addToCart2 = (item) => {
  //   const isItemInCart = cart.find((cartItem) => cartItem.id === item.id); // check if the item is already in the cart

  //   if (isItemInCart) {
  //     setCart(
  //       cart.map(
  //         (
  //           cartItem // if the item is already in the cart, increase the quantity of the item
  //         ) =>
  //           cartItem.id === item.id
  //             ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //             : cartItem // otherwise, return the cart item
  //       )
  //     );
  //   } else {
  //     setCart([...cart, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
  //   }
  // };

  // const navigateTo = (nextPage) => {
  //   setPage(nextPage);
  // };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };
  return (
    <div className="App">
      <div className="container">
        <div className="content">
          <Router>
            <NavBar cartLength={JSON.parse(localStorage.cart).length} />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/products"
                element={<ProductList addToCart={addToCart} />}
              />

              <Route
                path="/cart"
                element={
                  <Cart
                    MyCart={JSON.parse(localStorage.cart)}
                    removeFromCart={removeFromCart}
                  />
                }
              />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
