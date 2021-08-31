import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import AuthControl from "../Auth";
const Layout = (props) => {
  const AuthCtx = useContext(AuthContext);
  const authLink = AuthCtx.isAdmin() ? (
    <button onClick={AuthCtx.logout}>Logout</button>
  ) : (
    <NavLink to="/login">Login</NavLink>
  );
  return (
    // <AuthControl>
      <main>
        <NavLink to="/users">Users</NavLink> | 
         {authLink}
        <hr />
        <div >{props.children}</div>
      </main>
    // </AuthControl>
  );
};
export default Layout;
