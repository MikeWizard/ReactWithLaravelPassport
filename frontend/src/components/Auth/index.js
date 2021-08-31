import React from "react";
import apiClient from "../../services";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
const AuthControl = (props) => {
  
  //accedo al context, y si no esta logueado meto un router a login
  //Protocolo de revision y renovacion de token, investigar jwt
  const AuthCtx = useContext(AuthContext);
  const [token, setToken] = React.useState(
     sessionStorage.getItem("loggedIn") === "true" || false
  );
  const login = () => {
    sessionStorage.setItem("token", AuthCtx.token);
    // AuthCtx.loginSuccess(sessionStorage.getItem("token") || false)
    setToken(AuthCtx.token);
    
  };
  const logout = () => {
    apiClient.post("/logout").then((response) => {
      if (response.status === 204) {
        setToken(null);
        sessionStorage.setItem("token", null);
      }
    });
  };
  return <>{props.children}</>;
};
export default AuthControl;
