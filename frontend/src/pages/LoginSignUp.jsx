import React, { useState } from "react";
import "../pages/pages.css";
import axios from "axios";
export const LoginSignUp = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const login = async () => {
    // console.log("login func", formData);
    let responseData;
    responseData = await axios.post("http://localhost:4000/login", formData, {
      headers: { "Content-Type": "application/json" },
    });
   
    if (responseData.data.success) {
      localStorage.setItem("auth-token", responseData.data.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.data.error)
    }
  };
  const signup = async () => {
    // console.log("signup func", formData);
    let responseData;
    responseData = await axios.post("http://localhost:4000/signup", formData, {
      headers: { "Content-Type": "application/json" },
    });

    if (responseData.data.success) {
      localStorage.setItem("auth-token", responseData.data.token);
      window.location.replace("/");
    }else{
      alert(responseData.data.error)
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-feilds">
          {state === "sign up" ? (
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              onChange={changeHandler}
              value={formData.username}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={changeHandler}
            value={formData.email}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={changeHandler}
            value={formData.password}
          />
        </div>
        <button onClick={state === "sign up" ? () => signup() : () => login()}>
          continue
        </button>

        {state === "sign up" ? (
          <p className="loginsignup-login">
            Alredy have Account?
            <span onClick={() => setState("login")}>Login Here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            create an account?
            <span onClick={() => setState("sign up")}>sign up Here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing i agree to terms and condition</p>
        </div>
      </div>
    </div>
  );
};
