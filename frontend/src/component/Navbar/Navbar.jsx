import React, { useState, useRef } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import cart_log from "../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import drop_down from "../assets/dropdown_icon.png";
export default function Navbar() {
  const cartTotal = useSelector((state) => state.cartItems);
  const [menu, setMenu] = useState("Shop");
  const menuRef = useRef();
  console.log(cartTotal);
  console.log(cartTotal["totalCartItem"]);
  const drop_down_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPIFY</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={drop_down_toggle}
        src={drop_down}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("Shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            {" "}
            Shop
          </Link>
          {menu === "Shop" && <hr />}
        </li>
        <li onClick={() => setMenu("Women")}>
          <Link style={{ textDecoration: "none" }} to="/womens">
            {" "}
            Women
          </Link>
          {menu === "Women" && <hr />}
        </li>
        <li onClick={() => setMenu("Men")}>
          {" "}
          <Link style={{ textDecoration: "none" }} to="/mens">
            {" "}
            Men{" "}
          </Link>
          {menu === "Men" && <hr />}
        </li>
        <li onClick={() => setMenu("Kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">
            {" "}
            Kids{" "}
          </Link>
          {menu === "Kids" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/")
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/login">
              Log Out
            </Link>
          </button>
        ) : (
          <button>
            <Link style={{ textDecoration: "none" }} to="/login">
              Login
            </Link>
          </button>
        )}

        <Link style={{ textDecoration: "none" }} to="/cart">
          <img src={cart_log} alt="" />
        </Link>
        <div className="cart_count">{cartTotal.totalCartItem}</div>
      </div>
    </div>
  );
}
