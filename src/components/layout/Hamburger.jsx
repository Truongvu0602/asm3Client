import React from "react";
import classes from "./Hamburger.module.css";

const Hamburger = ({onClick}) => {
  return (
    <div onClick={onClick} className={classes.hamburger}>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
      <div className={classes.bar}></div>
    </div>
  );
};

export default Hamburger;
