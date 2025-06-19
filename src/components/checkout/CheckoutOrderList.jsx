import React from 'react';

import classes from './CheckoutOrderList.module.css';
import priceFormat from '../../utils/priceFormat';

export default function CheckoutOrderList ({items}) {

  return (
    <div>
      <ul className={classes.checkout_orderList}>
      {
        items.map(item => {
          return <li className={classes.checkout_orderItem} key={item.product._id}>
            <p className={classes.checkout_orderItemName} title={item.product.name}>{item.product.name}</p>
            <p className={classes.checkout_orderItemPrice}>{`${priceFormat(item.product.price)} x ${item.quantity}`}</p>
          </li>
        })
      }
      </ul>
    </div>
  )
}
