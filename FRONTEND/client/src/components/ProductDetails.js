import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";

function ProductDetails() {
  const [product, setProduct] = useState({});

  //   const params = useParams();

  const getProduct = async (id) => {
    const reqdata = await fetch(`http://localhost:5000/api/v1/products/${id}`);
    const data = await reqdata.json();
    console.log(data);
    setProduct(data);
  };

  useEffect(() => {
    const id = window.location.pathname.split(":");
    console.log(id[1]);
    getProduct(id[1]);
  }, []);

  return (
    <>
      <div id="productpage">
        <h2 id="productHeading">Product Details</h2>
        <div className="card mb-3">
          <span className="pdetails_add_to_cart">
            <button className="btn btn btn-primary">Add to Cart</button>
          </span>
          <section className="imageSection">
            <img
              className="img-fluid"
              src="http://localhost:5000/public/uploads/computerimage.jpg-1725812504102.jpeg"
              alt="logo"
            />
          </section>

          <div className="card-body">
            <h5 className="card-title">{product.productname}</h5>
            <p className="card-text">{product.richdescription}</p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>

            <div className="d-flex justify-content-between total font-weight-bold mt-4">
              <span>
                <h5>Total Price </h5>
              </span>
              <span>
                <h5>{product.price}</h5>{" "}
              </span>
            </div>

            <div className="card-footer bg-transparent border-success">
              <Link to="/products">
                {" "}
                <button className="btn btn btn-primary">
                  Back to Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
