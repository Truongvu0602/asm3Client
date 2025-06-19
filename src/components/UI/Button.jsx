import React from "react";

import classes from "./Button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Button(props) {


  return (
    <div
      className={`${classes.btn} ${props.light ? classes.light : classes.dark} ${props.center}`}
      style={props.center && {margin: '0 auto'}}
    >
      {props.isLink && (
        <Link to={props.toLink}>
          {props.icon && (
            <FontAwesomeIcon className={classes.btn_icon} icon={props.icon} />
          )}
          {props.text}
        </Link>
      )}
      {!props.isLink && (
        <>
          {props.icon && (
            <FontAwesomeIcon className={classes.btn_icon} icon={props.icon} />
          )}
          {props.text}
        </>
      )}
    </div>
  );
}
