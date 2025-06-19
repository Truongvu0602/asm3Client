import React from "react";

import classes from './ShopNavbarItem.module.css';

export default function ShopNavbarItem({name, changeCate, category}) {
  return (
    <li
      className={`${classes.shopNav_item} ${
        category === name ? classes.active : undefined
      } `}
      onClick={() => {
        changeCate(name);
      }}
    >
      {name}
    </li>
  );
}
