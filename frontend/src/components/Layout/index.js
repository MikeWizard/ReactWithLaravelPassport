import React from "react";
import { NavLink } from "react-router-dom";
import AuthControl from "../Auth";
const Layout = (props) => {
  const authLink = props.loggedIn ? (
    <button onClick={props.logout}>Logout</button>
  ) : (
    <NavLink to="/login">Login</NavLink>
  );
  return (
    <AuthControl>
      <main>
        <NavLink to="/books">Books</NavLink>
        {authLink}
        <hr />
        <div>{props.children}</div>
      </main>
    </AuthControl>
  );
};
export default Layout;
