import React from "react";
import "./Popular.css";
import data_product from "../assets/data";
import { Item } from "../Item/Item";
export const Popular = () => {
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, i) => {
          return(<Item
            key={i}
            id={item.id}
            name={item.name}
            old_price={item.old_price}
            new_price={item.new_price}
            image={item.image}
          />);
        })}
      </div>
    </div>
  );
};
