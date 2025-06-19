import React, { useState } from "react";

import classes from "./UserLogin.module.css";
import Card from "../UI/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import axios from "axios";
import { getUserCart } from "../../store/cartSlice";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const SERVER_URL = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      const response = await axios.post(
        `${SERVER_URL}/user/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      const data = await response.data;

      if (!data.user) {
        setError(data.message);
      } else {
        dispatch(userActions.onLogin(data.user));
        dispatch(getUserCart({ userId: data.user.id }));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      if (error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={classes.userLogin}>
      <Card title="Sign in">
        {error && <div className="text-danger text-center">{error}</div>}
        <form onSubmit={formSubmitHandler} className={classes.userLogin_form}>
          <div className={classes.userLogin_formControl}>
            <input
              name="email"
              onChange={emailChangeHandler}
              value={email}
              className={classes.userLogin_usernameInput}
              type="text"
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
          </div>
          <button className={classes.userLogin_btn}>Sign in</button>
        </form>
        <div className={classes.userLogin_text}>
          Create an account? <Link to="/register">Sign up</Link>
        </div>
      </Card>
    </div>
  );
}
