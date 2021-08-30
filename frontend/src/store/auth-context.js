import React from "react";
import { createContext } from "react";
const TokenContext = createContext("");
export function TokenContextProvider(props) {
  const [token, setToken] = React.useState("TOKEEEN");
  function loginSuccessHandler(token) {
    setToken(token);
    // console.log(token);
  }
  function isMaster(){
   return (token.data.scopes.indexOf("Master") > -1);
  }
  function isAdmin(){
   return (token.data.scopes.indexOf("Admin") > -1) || (isMaster(token));
  }
  function isEmployee(){
   return (token.data.scopes.indexOf("Employee") > -1) || (isAdmin(token));
  }
  function renewTokenHandler() {}

  const context = {
    token: token,
    renewToken: renewTokenHandler,
    loginSuccess: loginSuccessHandler,
    isMaster: isMaster,
    isAdmin: isAdmin,
    isEmployee: isEmployee,
  };
  return (
    <TokenContext.Provider value={context}>
      {props.children}
    </TokenContext.Provider>
  );
}
export default TokenContext;
