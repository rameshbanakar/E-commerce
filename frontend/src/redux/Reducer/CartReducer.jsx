const initialState ={
  item:[],
  totalAmount:null,
  totalCartItem:0
}

const CartReducer = (state = initialState, action) => {
 
  switch (action.type) {
    case "GET_DATA":
        //  console.log("cartreducer ", action.payload);
      return {
        ...action.payload,
      };
    case "ADD_ITEM_TO_CART":
      return {
        ...state,
        [action.payload.id]: state[action.payload.id]+1
      };
    case "REMOVE_ITEM_FROM_CART":
      return {
        ...state,
        [action.payload.id]: state[action.payload.id]-1,
      };
    case "TOTAL_AMOUNT":
      // console.log("TOTAL_AMOUNT",action.payload);
      return {
        ...state,
        totalAmount:action.payload
      };
    case "TOTAL_CART_ITEM":
      return {
        ...state,
        totalCartItem:action.payload
      };
    default:
      return state;
  }
};
export default CartReducer;
