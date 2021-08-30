import React from "react";
import apiClient from "../../services";
const AuthControl = (props) => {
  //accedo al context, y si no esta logueado meto un router a login
  //Protocolo de revision y renovacion de token, investigar jwt
  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem("loggedIn") === "true" || false
  );
  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem("loggedIn", true);
  };
  const logout = () => {
    apiClient.post("/logout").then((response) => {
      if (response.status === 204) {
        setLoggedIn(false);
        sessionStorage.setItem("loggedIn", false);
      }
    });
  };
  return <>{props.children}</>;
};
export default AuthControl;
