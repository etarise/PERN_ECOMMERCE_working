import React from "react";

function Cart({ MyCart, removeFromCart }) {
  console.log("In cart element");

  console.log(MyCart);

  return (
    <div className="cardContainer">
      {MyCart.map(function (product) {
        return (
          <div className="col-md-4 mt-1" key={product.productid}>
            <div>
              <div className="card border-primary mb-3 m-4">
                <div className="card-body">
                  <h5 className="card-title">{product.productname}</h5>
                  <section className="imageSection">
                    <img
                      className="img-fluid"
                      src="http://localhost:5000/public/uploads/computerimage.jpg-1725812504102.jpeg"
                      alt="logo"
                    />
                  </section>

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
                  <button className="btn btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
