import React from "react";
import "./ProductDisplay.css";
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import { addItemToCart } from "../../redux/Action/CartAction";
import {useDispatch} from "react-redux"
export const ProductDisplay = (props) => {
  const dispatch=useDispatch()
  const { product } = props;
 
  return (
    <div className="ProductDisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="prosuctdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-price">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-discription">
          A light weight, useully knitted,pullover shirt, close fitting and a
          round neckline and short sleeves,worn as an undershirt or outer
          garment
        </div>
        <div className="productdisplay-right-size">
          <h1>Select size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => dispatch(addItemToCart(product))}>
          ADD TO CART
        </button>
        
        <p className="productdisplay-right-category">
          <span>Category:</span>Women ,T-Shirt ,Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span>Modern Latest
        </p>
      </div>
    </div>
  );
};
