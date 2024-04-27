import React from "react";
import "./NewsLetter.css";
export const NewsLetter = () => {
  return (
    <div className="newsletter">
      <hr />
      <h1>Get exclusive offers on E-mail</h1>
      <p>subscribe to our newsletter and stay updated</p>
      <div>
        <input type="email" placeholder="Your email Id" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};
