import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../redux/Action/ItemAction";
import { Item } from "../component/Item/Item";
import "../pages/pages.css";
import drop_down from "../component/assets/dropdown_icon.png"
export const ShopCategory = (props) => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData("hello"));
  }, []);
  useEffect(() => {
    console.log("data has chnaged");
  }, [items.state]);
  try {
    return (
      <div className="shop-category">
        <img className="shopcategory-banner" src={props.banner} alt="" />
        <div className="shop-category-indexshort">
          <p>
            <span>showing 1-12</span>out of 36 products
          </p>
          <div className="shopcategory-short">
            sort by <img src={drop_down} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          {items.state.map((item, i) => {
            if (item.category === props.category) {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  old_price={item.old_price}
                  new_price={item.new_price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
        <div className="shopcategory-loadmore">
          Explore more
        </div>
      </div>
    );
  } catch (error) {
    return <div>No data</div>;
  }
};
