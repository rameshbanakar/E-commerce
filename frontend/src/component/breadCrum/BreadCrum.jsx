import React from "react";
import "./BreadCrum.css";
import arrow_png from "../assets/breadcrum_arrow.png";
export const BreadCrum = (props) => {
  const { product } = props;
  return (
    <div className="breadcrum">
      HOME <img src={arrow_png} alt="" />
      SHOP <img src={arrow_png} alt="" />
      {product.category}
      <img src={arrow_png} alt="" />
      {product.name}
    </div>
  );
};
