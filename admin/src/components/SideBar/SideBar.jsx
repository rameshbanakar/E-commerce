import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import productCart from "../../assets/Product_Cart.svg";
import productList from "../../assets/Product_list_icon.svg"
const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={productCart} alt="" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={productList} alt="" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
