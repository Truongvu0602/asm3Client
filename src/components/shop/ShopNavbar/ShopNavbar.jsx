import React from "react";

import classes from "./ShopNavbar.module.css";
import ShopNavbarItem from "./ShopNavbarItem";

export default function ShopNavbar({ category, onChangeCate }) {
  return (
    <div className={`${classes.shopNav_wrapper}`}>
      <h3 className={classes.shopNav_text}>Categories</h3>
      <p className={classes.shopNav_brand}>Apple</p>
      <ul className={classes.shopNav_list}>
        <ShopNavbarItem name='all' category={category} changeCate={onChangeCate}/>
        <p className={classes.shopNav_listHeader}>Iphone & Mac</p>
        <ShopNavbarItem name='iphone' category={category} changeCate={onChangeCate}/>
        <ShopNavbarItem name='ipad' category={category} changeCate={onChangeCate}/>
        <ShopNavbarItem name='macbook' category={category} changeCate={onChangeCate}/>
        <p className={classes.shopNav_listHeader}>Wireless</p>
        <ShopNavbarItem name='airpod' category={category} changeCate={onChangeCate}/>
        <ShopNavbarItem name='watch' category={category} changeCate={onChangeCate}/>
        <p className={classes.shopNav_listHeader}>Other</p>
        <ShopNavbarItem name='mouse' category={category} changeCate={onChangeCate}/>
        <ShopNavbarItem name='keyboard' category={category} changeCate={onChangeCate}/>
        <ShopNavbarItem name='other' category={category} changeCate={onChangeCate}/>
      </ul>
    </div>
  );
}
