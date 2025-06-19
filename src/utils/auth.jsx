import { redirect } from "react-router-dom";

export function getAuthorization() {
  if (!localStorage.getItem("loggedUser")) {
    return redirect("/login");
  }
}
