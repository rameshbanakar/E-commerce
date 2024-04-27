// import all_data from "../../component/assets/all_product"

import axios from "axios"
export const getData = (data) => async (dispatch) => {
  
  try {
    const all_data=await axios.get("http://localhost:4000/allproduct")
    // console.log(all_data)
    dispatch({
      type: "GET_DATA_ITEM",
      payload: all_data.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};