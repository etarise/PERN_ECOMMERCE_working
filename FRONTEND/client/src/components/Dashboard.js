/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import NavBar from "./NavBar";
import Search from "./Search";
import ProductList from "./ProductList";
//import { useNavigate } from "react-router-dom";

function Dashboard() {
  //const navigate = useNavigate();

  // const logout = () => {
  //   try {
  //     fetch("http://localhost:5000/api/v1/users/logout", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((r) => r.json())
  //       .then((data) => {
  //         if (data.Status === "Success") {
  //           // alert(data.Status + " yes aya");
  //           navigate("/");
  //         } else {
  //           //  alert(data.Status + " no aya");
  //         }
  //       });
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  //   // localStorage.removeItem("user-infor");
  //   // navigate("/");
  // };
  return (
    <Fragment>
      <NavBar />
      <Search />
      <ProductList />
    </Fragment>
  );
}

export default Dashboard;
