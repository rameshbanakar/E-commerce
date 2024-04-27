const initialState = []

const Reducer = (state = initialState, action) => {
 
  switch (action.type) {
    case "GET_DATA_ITEM":
        // console.log("Itemreducer ", action.payload);
      return {
        state: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;
