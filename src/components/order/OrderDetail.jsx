import React, { useEffect, useState } from "react";

import classes from "./OrderDetail.module.css";
import axios from "axios";
import { Col, Row, Table } from "react-bootstrap";

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState({});

  const orderId = window.location.pathname.split("/")[2];
  const SERVER_URL = import.meta.env.VITE_SERVER;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/order/${orderId}`, {
          withCredentials: true,
        });
        const data = await response.data;
        setOrderDetail(data.order);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!orderDetail) return <div>Cant get orders!</div>;

  return (
    <div className="overflow=scroll">
      <Row>
        <Col>
          <h1>INFORMATION ORDER</h1>
          <p>ID User: {orderDetail.user}</p>
          <p>Full name: {orderDetail.name}</p>
          <p>Phone: {orderDetail.phone}</p>
          <p>Address: {orderDetail.address}</p>
          <p>
            Total:{" "}
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(orderDetail.totalPrice)}
          </p>
        </Col>
      </Row>
      <Row>
        <Table className="mt-5">
          <thead>
            <tr>
              <th>ID PRODUCT</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>COUNT</th>
            </tr>
          </thead>
          <tbody>
            {orderDetail.cart &&
              orderDetail.cart.map((item) => {
                return (
                  <tr>
                    <td>{item.product._id}</td>
                    <td>
                      <img
                        className={classes.orderProductImg}
                        src={item.product.images[0]}
                        alt=""
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.product.price)}
                    </td>
                    <td>{item.quantity}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default OrderDetail;
