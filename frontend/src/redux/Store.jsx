import { createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import Reducer from "./Reducer/ItemReducer";
import CartReducer from "./Reducer/CartReducer"
const rootReducer = combineReducers({
  items: Reducer,
  cartItems:CartReducer
});
const Store = createStore(rootReducer, applyMiddleware(...[thunk]));
export default Store;
