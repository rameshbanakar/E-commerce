import all_data from "../../component/assets/all_product";
import axios from "axios";
export const getDataForCart = (data) => async (dispatch) => {
  // let cart_data = {};
  // for (let i = 0; i < all_data.length + 1; i++) {
  //   cart_data[i] = 0;
  // }
  if(localStorage.getItem("auth-token")){
    const cart_data = await axios.get("http://localhost:4000/getcartItems", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
    });
    // console.log(cart_data.data);
     try {
       dispatch({
         type: "GET_DATA",
         payload: cart_data.data,
       });
     } catch (error) {
       console.log(error);
     }
  }
 
};

export const addItemToCart = (data) => async (dispatch) => {
 
  if (localStorage.getItem("auth-token")) {
    const resp = await axios.post("http://localhost:4000/addtocart", data, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
    });
    console.log(resp);
    try {
      dispatch({
        type: "ADD_ITEM_TO_CART",
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
   
  
};

export const removeItemToCart = (data) => async (dispatch) => {
  if (localStorage.getItem("auth-token")) {
    const resp = await axios.post(
      "http://localhost:4000/removecartItem",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
      }
    );
    console.log(resp);
    try {
      dispatch({
        type: "REMOVE_ITEM_FROM_CART",
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  
};

export const totalCartAmount = (data) => async (dispatch) => {
  // console.log("removeCart", data);
  try {
    dispatch({
      type: "TOTAL_AMOUNT",
      payload: data,
    });
  } catch (error) {
    console.log("my error", error);
  }
};

export const totalCartItem = (data) => async (dispatch) => {
  // console.log("removeCart", data);
  try {
    dispatch({
      type: "TOTAL_CART_ITEM",
      payload: data,
    });
  } catch (error) {
    console.log("my error", error);
  }
};
