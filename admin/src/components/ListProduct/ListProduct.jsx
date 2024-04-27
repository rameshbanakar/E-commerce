import React, { useEffect } from "react";
import "./ListProduct.css";
import { useState } from "react";
import cross_icon from "../../assets/cross_icon.png";
const ListProduct = () => {
  const [allproduct, setAllProduct] = useState([]);
  const fetchAllProduct = async () => {
    await fetch("http://localhost:4000/allproduct", { method: "GET" })
      .then((resp) => resp.json())
      .then((data) => setAllProduct(data.data));
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  const remove_product=async(id)=>{
    await fetch("http://localhost:4000/removeproduct",{
      method:"DELETE",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:id})
    });
    await fetchAllProduct();
  }
  return (
    <div className="list-product">
      <h1>ALL PRODUCT LIST</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      
      <div className="listproduct-allproduct">
       
        {allproduct.length > 0 &&
          allproduct.map((product, index) => {
            return (
              <>
                <div
                  key={index}
                  className="listproduct-format-main listproduct-format"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="listproduct-product-icon"
                  />
                  <p>{product.name}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <p>{product.category}</p>
                  <img
                    src={cross_icon}
                    alt=""
                    onClick={()=>{remove_product(product.id)}}
                    className="listproduct-remove-icon"
                  />
                </div>
                <hr />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default ListProduct;