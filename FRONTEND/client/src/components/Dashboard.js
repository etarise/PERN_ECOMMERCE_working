/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import NavBar from "./NavBar";
import Search from "./Search";
import ProductList from "./ProductList";
//import { useNavigate } from "react-router-dom";

function Dashboard({ cartLength, addToCart }) {
  return (
    <Fragment>
      <NavBar cartLength={cartLength} />
      <Search />
      <ProductList addToCart={addToCart} />
    </Fragment>
  );
}

export default Dashboard;
