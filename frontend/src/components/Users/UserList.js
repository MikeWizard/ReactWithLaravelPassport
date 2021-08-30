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
} from "react-router-dom";
const Users = (props) => {
  const AuthCtx = useContext(AuthContext);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    apiClient
      .get("/api/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  const userList = users.map((user) => <li key={user.id}>{user.title}</li>);
  let output = <div>You are not logged in.</div>;
  if (AuthCtx.isAdmin()) {
    output = <ul>{userList}</ul>;
  }
  let form = <UserForm />;

  let match = useRouteMatch();
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
