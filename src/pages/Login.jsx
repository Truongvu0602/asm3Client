import React from "react";
import UserLogin from "../components/user/UserLogin";
import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Login() {
  const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <div>
      {isLogin ? (
        <p className="text-center text-primary vh-100 d-flex align-items-center justify-content-center">
          You're already logged in.
        </p>
      ) : (
        <UserLogin />
      )}
    </div>
  );
}

export const action = async ({ request }) => {
  const data = await request.formData();

  const user = {
    name: data.get("name"),
    email: data.get("email"),
    phone: data.get("phone"),
  };

  if (data.get("name") !== null) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
  }

  return redirect("/");
};
