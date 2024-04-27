import React from "react";
import "../descriptionBox/DescriptionBox.css";
export const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          A E-commerce website is anonline platform that facilitate the buying
          and selling of the products or service over the internet serves as the
          virtual marketplace where bussiness and individual showcase their
          product and intract with customer and conduct the transactions without
          physical presence.E-commerce websites have gained immense
          .new-collectionsity due to their convienent accessability and global
          reach their offer.
        </p>
        <p>
          E-commerce website typically display product or services along with
          the detailed description images,price and any availbale
          variations.Each product has it's own dedicated pages with relevent
          informations.
        </p>
      </div>
    </div>
  );
};
