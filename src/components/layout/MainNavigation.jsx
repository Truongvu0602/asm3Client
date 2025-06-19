import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";

import { Container, NavDropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faCartShopping,
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";
import axios from "axios";
import Hamburger from "./Hamburger";
import MainMenuMobile from "./MainMenuMobile";

export default function MainNavigation() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartQuant = useSelector((state) => state.cart.cartQuant);
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SERVER_HOST = import.meta.env.VITE_SERVER;

  const logoutHandler = async () => {
    const response = await axios.get(`${SERVER_HOST}/user/logout`, {
      withCredentials: true,
    });
    const data = await response.data;
    // if (data.status !== 200) {
    //   throw json({ message: "You are not logged in" }, { status: 401 });
    // }
    dispatch(userActions.onLogout());
    navigate("/login");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Container
      fluid
      className="sticky-top m-0"
      style={{ backgroundColor: "white" }}
    >
      <nav className={`${classes.main_nav} px-3`}>
        <ul className={classes.nav_list}>
          <li className={classes.nav_item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className={classes.nav_item}>
            <NavLink
              to="shop"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : undefined
              }
            >
              Shop
            </NavLink>
          </li>
        </ul>
        <Hamburger onClick={toggleMobileMenu} />
        <MainMenuMobile show={showMenu} onClick={toggleMobileMenu} />
        <div className={`${classes.nav_brand} flex-0`}>
          <h1 className={classes.nav_brandText}>
            <Link to="/">Shop</Link>
          </h1>
        </div>
        <div className="d-flex">
          <ul className="d-flex mb-0">
            {isLogin && (
              <li
                className={`${classes.nav_item} d-flex align-items-center justify-content-center`}
              >
                <NavDropdown
                  id="nav-dropdown-dark"
                  title={
                    <span>
                      <FontAwesomeIcon
                        className={classes.link_icon}
                        icon={faUser}
                      />
                      <span className={classes.userInfo}>
                        {userInfo.username}
                      </span>
                    </span>
                  }
                  menuVariant="light"
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to="/order"
                    className={({ isActive }) =>
                      isActive ? `${classes.active}` : undefined
                    }
                  >
                    Your orders
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={logoutHandler}
                    className="text-danger"
                  >
                    <FontAwesomeIcon
                      className={classes.link_icon}
                      icon={faArrowRightFromBracket}
                    />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            )}
            <li
              className={`${classes.nav_item} d-flex align-items-center justify-content-center`}
            >
              {!isLogin && (
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    isActive ? `${classes.active}` : undefined
                  }
                >
                  <FontAwesomeIcon
                    className={classes.link_icon}
                    icon={faRightToBracket}
                  />
                  Login
                </NavLink>
              )}
            </li>
          </ul>
          <div className={classes.nav_cartIcon}>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : undefined
              }
            >
              <FontAwesomeIcon
                className={`${classes.link_icon}`}
                icon={faCartShopping}
              ></FontAwesomeIcon>
              <span className={classes.nav_cartQuant}>{cartQuant}</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </Container>
  );
}
