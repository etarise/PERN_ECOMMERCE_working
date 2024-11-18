import { React, useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

function ProductDetails({ id }) {
  const [product, setProduct] = useState({});
  //   const params = useParams();

  useEffect(() => {
    const getProduct = async () => {
      console.log("in details");
      const reqdata = await fetch(`http://localhost:5000/api/v1/products/${8}`);
      const data = await reqdata.json();
      console.log(data);
      setProduct(data);
    };
    getProduct();
  });

  return (
    <div>
      <h1>Product Information</h1>
      <h1>{product.productid}</h1>
      <h1>{product.productname}</h1>
      <p> </p>
    </div>
  );
}

export default ProductDetails;
