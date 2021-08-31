import React from "react";
import apiClient from "../../services";
import User from "./User";
import UserForm from "./UserForm";
import Layout from "../Layout";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  NavLink
} from "react-router-dom";
const Users = (props) => {
  const AuthCtx = useContext(AuthContext);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    // console.log(AuthCtx.token.token);
    if (AuthCtx.isAdmin()) {
      const config = {
        headers: { Authorization: `Bearer ${AuthCtx.token.token}` }
      };
      apiClient
        .get("/api/users/list",config)
        .then((response) => {
          setUsers(response.data.data);
        })
        .catch((error) => console.error(error));
    }
  }, []);
  let match = useRouteMatch();
  const userList = users.map((user) => <li key={user.id}>{user.name}( {user.email} )<NavLink to={`${match.path}/${user.id}`}>View</NavLink> | <NavLink to={`${match.path}/${user.id}/edit`}>Edit</NavLink> | <NavLink to={`${match.path}/${user.id}/delete`}>Delete</NavLink></li>);
  let output = <div>You are not logged in.</div>;
  if (AuthCtx.isAdmin()) {
    output = <ul>{userList}</ul>;
  }
  let form = <UserForm />;

  // console.log(AuthCtx.token);
  return (
    <Layout>
      <Switch>
        <Route path={`${match.path}/create`}>{form}</Route>
        <Route path={`${match.path}/:userId`}>
          <User />
        </Route>
        <Route path={match.path}>
          <h3>Please select a user.</h3>
        </Route>
      </Switch>
      {output}
    </Layout>
  );
};
export default Users;
