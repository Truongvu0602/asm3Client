import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/layout/MainNavigation";
import Footer from "../components/layout/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProductModal from "../components/home/ProductModal";
import { userActions } from "../store/userSlice";
import Chat from "../components/chat/Chat";
import { getUserCart } from "../store/cartSlice";

export default function Root() {
  const modalShow = useSelector((state) => state.modal.show);
  const modalItem = useSelector((state) => state.modal.item);

  const dispatch = useDispatch();

  const { isLogin, userInfo } = useSelector((state) => state.user);

  const SERVER_URL = import.meta.env.VITE_SERVER;

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/user/auth`, {
          withCredentials: true,
        });
        const data = await response.data;
        console.log(data);
        if (data.user) {
          dispatch(userActions.onLogin(data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoggedInUser();
  }, []);

  useEffect(() => {
    userInfo && dispatch(getUserCart({ userId: userInfo.id }));
  }, [isLogin, userInfo, dispatch]);

  return (
    <div>
      <MainNavigation />
      <Chat />
      {modalShow && <ProductModal modalItem={modalItem} />}
      <Container className="mockContent" fluid="sm">
        <Outlet />
      </Container>
      <Footer></Footer>
    </div>
  );
}

export const loader = async () => {
  const SERVER_URL = import.meta.env.VITE_SERVER;

  try {
    const product = await axios.get(`${SERVER_URL}/product/all`);
    // if (product.status !== 200) {
    //   throw json(
    //     { message: "Error while getting user information !" },
    //     { status: 500 }
    //   );
    // }
    return product.data || null;
  } catch (error) {
    console.log(error.message);
  }
};
