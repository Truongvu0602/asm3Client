import React, { useState } from "react";

import classes from "./UserLogin.module.css";
import Card from "../UI/Card";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

export default function UserLogin() {
  const SERVER_URL = import.meta.env.VITE_SERVER;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const phoneChangeHandler = (e) => {
    setPhone(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // setError(null);
    // const userData = JSON.parse(localStorage.getItem("userArr")) || [];

    // if (userData.some((user) => user.email === email)) {
    //   setError("Email is already existed !");
    //   return;
    // }

    // if (password.length < 6) {
    //   setError("Password must be longer than 6 digits.");
    //   return;
    // }
    // if (error === null) {
    //   submit(e.currentTarget, {
    //     action: "/register",
    //     method: "POST",
    //   });
    // } else {
    //   return;
    // }
    try {
      const response = await axios.post(`${SERVER_URL}/user/signup`, {
        username: name,
        email: email,
        password: password,
        phone: phone,
      });
      const data = await response.data;

      if (!data.user) {
        return setError(data.message);
      }
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      if (error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={classes.userLogin}>
      <Card title="Sign up">
        {error && (
          <div className="text-danger text-center text-medium">{error}</div>
        )}
        <form onSubmit={formSubmitHandler} className={classes.userLogin_form}>
          <div className={classes.userLogin_formControl}>
            <input
              name="name"
              onChange={nameChangeHandler}
              value={name}
              className={classes.userLogin_usernameInput}
              type="text"
              placeholder="Name"
              required
            />
            <input
              name="email"
              onChange={emailChangeHandler}
              value={email}
              className={classes.userLogin_passwordInput}
              type="email"
              placeholder="Email"
              required
            />
            <input
              name="password"
              onChange={passwordChangeHandler}
              value={password}
              className={classes.userLogin_passwordInput}
              type="password"
              placeholder="Password"
              required
            />
            <input
              name="phone"
              onChange={phoneChangeHandler}
              value={phone}
              className={classes.userLogin_passwordInput}
              type="text"
              placeholder="Phone"
              required
            />
          </div>
          <button className={classes.userLogin_btn}>Sign up</button>
        </form>
        <div className={classes.userLogin_text}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </Card>
    </div>
  );
}
