import React from "react";
import classes from "./MainMenuMobile.module.css";
import { NavLink } from "react-router-dom";

const MainMenuMobile = ({ show, onClick }) => {
  return (
    <div
      className={`${classes.menu_mobile} shadow-sm ${
        show ? classes.show : classes.hide
      }`}
    >
      <ul className={`${classes.menu_mobile_list}`}>
        <NavLink is="li" to={"/"} className={`${classes.menu_mobile_item}`}>
          Home
        </NavLink>
        <NavLink is="li" to={"/shop"} className={classes.menu_mobile_item}>
          Products
        </NavLink>
      </ul>
    </div>
  );
};

export default MainMenuMobile;
