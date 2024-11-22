// App.js

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
//import Login from "./components/Login";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
import NoMatch from "./components/NoMatch";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Details from "./components/ProductDetails";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="content">
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/products" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product-details/:id" element={<Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
