import React, { useState } from "react";

import classes from "./ProductModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClose, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";
import { RotatingLines } from "react-loader-spinner";

export default function ProductModal(props) {
  const [hideAnimate, setHideAnimate] = useState(false);

  const { modalItem } = props;

  const modalShow = useSelector((state) => state.modal.show);

  const dispatch = useDispatch();

  const closeModalHandler = () => {
    setHideAnimate(true);
    setTimeout(() => {
      dispatch(modalActions.hideModal());
    }, 200);
  };

  return (
    <>
      <div
        className={`${classes.productModal_backdrop} ${
          modalShow ? classes.show : classes.hide
        } `}
        onClick={closeModalHandler}
      ></div>
      <div
        className={`${classes.productModal} ${
          modalShow ? classes.show : undefined
        } ${hideAnimate ? classes.hide : undefined}`}
      >
        <div className={classes.productModal_close} onClick={closeModalHandler}>
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div className={classes.productModal_contentWrapper}>
          <div className={classes.productModal_imgWrapper}>
            <img
              alt="modalIMG"
              className={`${classes.productModal_img} img-fluid`}
              src={modalItem.images[0]}
            />
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={!modalItem.img1}
            />
          </div>
          <div className={classes.productModal_body}>
            <div className={classes.productModal_content}>
              <div className={classes.productModal_title}>
                <h5>{modalItem.name}</h5>
              </div>
              <div className={classes.productModal_price}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(modalItem.price)}
              </div>
              <p className={classes.productModal_description}>
                {modalItem.short_desc}
              </p>
              <div
                className={classes.productModal_actions}
                onClick={closeModalHandler}
              >
                <Button
                  text="View Detail"
                  icon={faCartShopping}
                  isLink
                  toLink={`detail/${modalItem._id}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
