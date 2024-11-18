import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function ProductList() {
  const [productData, setProductData] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    const getProductdata = async () => {
      const reqdata = await fetch("http://localhost:5000/api/v1/products/");
      const resData = await reqdata.json();
      setProductData(resData);
      console.log(resData);
    };
    getProductdata();
  }, []);

  // function handleClick() {
  //   setShowModal(!showModal);
  // }

  return (
    <div className="cardContainer">
      {productData.map(function (product) {
        return (
          <div className="col-md-4 mt-1 " key={product.productid}>
            <div>
              <div className="card border-primary mb-3 m-4">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    {product.productname}
                  </h5>
                  <section className="imageSection">
                    <img
                      className="img-fluid"
                      src="http://localhost:5000/public/uploads/computerimage.jpg-1725812504102.jpeg"
                      alt="logo"
                    />
                  </section>

                  <p className="card-text">
                    JavaScript is a versatile programming language used for web
                    development.
                  </p>
                  <div className="d-flex justify-content-between total font-weight-bold mt-4">
                    <span>
                      <h5>Total Price </h5>
                    </span>
                    <span>
                      <h5>{product.price}</h5>{" "}
                    </span>
                  </div>
                </div>
                <div className="card-footer bg-transparent border-success">
                  <Link to={`products/${product.productid}`}>
                    <button>
                      <h6>View Link </h6>
                    </button>
                  </Link>

                  {/* <button
                    className="btn btn btn-primary"
                    onClick={() => handleClick()}
                  >
                    View
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
