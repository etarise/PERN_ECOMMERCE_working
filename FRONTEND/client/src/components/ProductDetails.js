import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetails({ id }) {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    const getProduct = async () => {
      console.log("in details");
      const result = await fetch(
        `http://localhost:5000/api/v1/products/${params.productid}`
      );
      const data = await result.json();
      setProduct(data);
    };
    getProduct();
  });

  return (
    <div>
      <h1>{product.productid}</h1>
      <h1>{product.productname}</h1>
      <p> </p>
    </div>
  );
}

export default ProductDetails;
