import React from "react";
import { useSelector } from "react-redux";
import  {CartItems}  from "../component/cartItems/cartItems.jsx";
// import { getDataForCart } from "../redux/Action/CartAction";
export const Cart = (props) => {
  let { totalAmount } = props;
  let cartItems = useSelector((state) => state.cartItems);
  // console.log("cartpage",totalAmount)
  return (
    <div>
      <CartItems cartItems={cartItems}  />
    </div>
  );
};
