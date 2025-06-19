import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../store/orderSlice";

import classes from "./OrdersContent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faLongArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const OrdersContent = () => {
  const dispatch = useDispatch();
  const orderStates = useSelector((state) => state.orderReducer);
  console.log(orderStates.orders);

  useEffect(() => {
    dispatch(getOrder());
  }, []);

  if (orderStates.loading) {
    return (
      <div className="text-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="overflow-scroll">
      <Table className={classes.orderContentTable}>
        <thead className="table-light text-uppercase">
          <tr className="text-center">
            <th>id order</th>
            <th>id user</th>
            <th>name</th>
            <th>phone</th>
            <th>address</th>
            <th>total</th>
            <th>delivery</th>
            <th>status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={classes.orderTableContent}>
          {orderStates.orders &&
            orderStates.orders.map((order) => {
              return (
                <tr key={order._id} className={classes.orderRowContent}>
                  <td>{order._id}</td>
                  <td>{order.user}</td>
                  <td>{order.name}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalPrice)}
                  </td>
                  <td>{order.status}</td>
                  <td>{order.paymentStatus}</td>
                  <td>
                    <Link
                      to={"/order/" + order._id}
                      className={classes.orderDetailBtn}
                    >
                      Detail
                      <FontAwesomeIcon icon={faLongArrowRight} />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersContent;
