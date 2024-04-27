import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
const AddProduct = () => {
  const [seleted_img, setSeleted_img] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    old_price: "",
    new_price: "",
    category: "",
  });
  const img_changed = (e) => {
    setSeleted_img(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const add_product = async (e) => {
    e.preventDefault();
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", seleted_img);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => (responseData = data));
    //console.log(responseData)
    alert("Product adde successfully")
    if (responseData.status === "Success") {
      product.image = responseData.img_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          placeholder="Type here"
          onChange={changeHandler}
          value={productDetails.name}
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            placeholder="Type here"
            onChange={changeHandler}
            value={productDetails.old_price}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            placeholder="Type here"
            value={productDetails.new_price}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="add-product-selector"
          onChange={changeHandler}
          value={productDetails.category}
        >
          <option value="select" disabled defaultValue>
            select
          </option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={seleted_img ? URL.createObjectURL(seleted_img) : upload_area}
            alt=""
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          hidden
          onChange={img_changed}
        />
      </div>
      <button className="addproduct-btn" onClick={add_product}>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
