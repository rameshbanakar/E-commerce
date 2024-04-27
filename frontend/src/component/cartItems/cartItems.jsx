import React from "react";
import "./cartItems.css";
import { useDispatch } from "react-redux";
import remove_icom from "../assets/cart_cross_icon.png";
import { removeItemToCart } from "../../redux/Action/CartAction";
import {useSelector} from "react-redux"
import all_product from "../assets/all_product";
export const CartItems = (props) => {
  const total = useSelector((state) => state.cartItems);
  // console.log("cart",total)
  const dispatch = useDispatch();
  const { cartItems } = props;


  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {
        // eslint-disable-next-line
        all_product.map((e, index) => {
          if (cartItems[e.id] > 0) {
            // dataChange(e.new_price * cartItems[e.id])

            return (
              <div key={index}>
                <div className="cartItems-format cartItems-format-main">
                  <img src={e.image} alt="" className="cartIcon-product-icon" />
                  <p>{e.name}</p>
                  <p>${e.new_price}</p>
                  <button className="cartItems-quatity">
                    {cartItems[e.id]}
                  </button>
                  <p>${e.new_price * cartItems[e.id]}</p>
                  <img
                    src={remove_icom}
                    alt=""
                    onClick={() => dispatch(removeItemToCart(e))}
                    className="cartItem-remove-icon"
                  />
                </div>
              </div>
            );
          }
          return null;
        })
      }
      <div className="cartItems-down">
        <div className="cartItems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartItems-total-items">
              <p>subtotal</p>
              <p>${total.totalAmount}</p>
            </div>
            <hr />
            <div className="cartItems-total-items">
              <p>Shipping Charge</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartItems-total-items">
              <h3>Total</h3>
              <h3>${total.totalAmount}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartItems-promocode">
          <p>If you have promocode Enter it here!</p>
          <div className="cartItems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
