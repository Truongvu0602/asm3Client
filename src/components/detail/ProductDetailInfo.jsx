import React from 'react';

import classes from './ProductDetailInfo.module.css'

export default function ProductDetailInfo({product}) {
  return (
    <div className={classes.detailInfo_wrapper}>
            <h3 className={classes.detailInfo_name}>{product.name}</h3>
            <p className={classes.detailInfo_price}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </p>
            <p className={classes.detailInfo_shortDesc}>{product.short_desc}</p>
            <div className={classes.detailInfo_category}>
              <h6>
                CATEGORY : <span>{product.category}</span>
              </h6>
              <h6>
                IN STOCK : <span>{product.stock}</span>
              </h6>
            </div>
          </div>
  )
}
