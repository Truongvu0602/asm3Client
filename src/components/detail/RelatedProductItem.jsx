import React from 'react';

import classes from './RelatedProductItem.module.css';
import { useNavigate } from 'react-router-dom';

export default function RelatedProductItem(props) {
  const navigate = useNavigate() ;
  return (
    <div className={`${classes.product_item} image-fluid`} onClick={() => {navigate(`/detail/${props.item._id}`)}}>
      <div
        className={classes.product_img}
        style={{ backgroundImage: `url(${props.item.images[0]})` }}
      ></div>
      <div className={classes.product_name}>{props.item.name}</div>
      <div className={classes.product_price}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.item.price)}
      </div>
    </div>
  )
}
