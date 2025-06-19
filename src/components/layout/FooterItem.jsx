import React from "react";

import classes from "./FooterItem.module.css";
import { Link } from "react-router-dom";

export default function FooterItem(props) {
  return (
    <div>
      <h2 className={classes.footer_title}>{props.title}</h2>
      <ul className={classes.footer_list}>
        <li className={classes.footer_item}>
          <Link to='/' className={classes.footer_link}>{props.text1}</Link>
        </li>
        <li className={classes.footer_item}>
          <Link to='/' className={classes.footer_link}>{props.text2}</Link>
        </li>
        <li className={classes.footer_item}>
          <Link to='/' className={classes.footer_link}>{props.text3}</Link>
        </li>
        <li className={classes.footer_item}>
          <Link to='/' className={classes.footer_link}>{props.text4}</Link>
        </li>
      </ul>
    </div>
  );
}
