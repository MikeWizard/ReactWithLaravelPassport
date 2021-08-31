import React from "react";
import { createContext } from "react";
const TokenContext = createContext("");
export function TokenContextProvider(props) {
  const [token, setToken] = React.useState(
    JSON.parse(sessionStorage.getItem("token")) || null
  );
  function loginSuccessHandler(token) {
    setToken(token);
    sessionStorage.setItem("token", JSON.stringify(token));
  }
  function isMaster(){
   return token && token.data && (token.data.scopes.indexOf("Master") > -1);
  }
  function isAdmin(){
   return token && token.data && (token.data.scopes.indexOf("Admin") > -1) || (isMaster(token));
  }
  function isEmployee(){
   return token && (token.data.scopes.indexOf("Employee") > -1) || (isAdmin(token));
  }
  function logout(){
    setToken(null);
    sessionStorage.setItem("token",null);
  }
  function renewTokenHandler() {}

  const context = {
    token: token,
    renewToken: renewTokenHandler,
    loginSuccess: loginSuccessHandler,
    isMaster: isMaster,
    isAdmin: isAdmin,
    isEmployee: isEmployee,
    logout:logout,
  };
  return (
    <TokenContext.Provider value={context}>
      {props.children}
    </TokenContext.Provider>
  );
}
export default TokenContext;
