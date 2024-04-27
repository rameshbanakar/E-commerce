import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import { ShopCategory } from "./pages/ShopCategory";
import { Product } from "./pages/Product";
import { Cart } from "./pages/Cart";
import { LoginSignUp } from "./pages/LoginSignUp";
import { Footer } from "./component/Footer/Footer";
import men_banner from "./component/assets/banner_mens.png";
import women_banner from "./component/assets/banner_women.png";
import kid_banner from "./component/assets/banner_kids.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataForCart,
  totalCartAmount,
  totalCartItem,
} from "./redux/Action/CartAction";
import { getData } from "./redux/Action/ItemAction";
function App() {
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const cartData = useSelector((state) => state.cartItems);
  const all_data = useSelector((state) => state.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
    dispatch(getDataForCart());
  }, []);
  useEffect(() => {
    setTotal(0);
    setCartItems(0);
    let amount = 0;
    let items = 0;
    for (let key in cartData) {
      if (cartData[key] > 0) {
        for (let data of all_data.state) {
          if (data["id"] === Number(key)) {
            items = items + cartData[key];
            amount = amount + data["new_price"] * cartData[key];
          }
        }
      }
    }
    setCartItems(items);
    setTotal(amount);
  }, [cartData, all_data]);
  useEffect(() => {
    dispatch(totalCartAmount(total));
    dispatch(totalCartItem(cartItems));
  }, [total, cartItems]);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/mens"
          element={<ShopCategory category="men" banner={men_banner} />}
        />
        <Route
          path="/womens"
          element={<ShopCategory category="women" banner={women_banner} />}
        />
        <Route
          path="/kids"
          element={<ShopCategory category="kid" banner={kid_banner} />}
        />
        <Route path="/products" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        .
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
