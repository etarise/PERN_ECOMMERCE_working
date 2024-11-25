import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faUser } from "@fortawesome/fontawesome-free-solid";
// import "./Navbar.css";

const Navbar = ({ cartLength }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          Rudo E-Shop
        </a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="/products">Products</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <a href="/cart" className="cart-icon">
          <h1>
            {" "}
            <FontAwesomeIcon icon={faCartPlus} />
          </h1>
          <i className="fas fa-shopping-cart"></i>

          <span className="cart-count">{cartLength}</span>
        </a>
        <a href="/account" className="user-icon">
          <i className="fas fa-user"></i>
        </a>
      </div>
      <div>
        {" "}
        <h1>
          <FontAwesomeIcon icon={faUser} />
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
