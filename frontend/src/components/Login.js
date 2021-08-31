import React from "react";
import apiClient from "../services";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Router, Redirect } from "react-router-dom";
const Login = (props) => {
  const AuthCtx = useContext(AuthContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedInPage, setLoggedInPage] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.post("api/users/login/", {
            email: email,
            password: password,
          }).then((response) => {
            if (response.status === 200) {//204 cuando es spa con sanctum
              AuthCtx.loginSuccess(response.data);
              // console.log(response.data.data);
              setLoggedInPage("/users");
            }
          });
      };
  //   apiClient.get("/sanctum/csrf-cookie").then((response) => {
  //     apiClient
  //       .post("/login", {
  //         email: email,
  //         password: password,
  //       })
  //       .then((response) => {
  //         if (response.status === 204) {
  //           AuthCtx.loginSuccess("He recibido un token");
  //           setLoggedInPage("/books");
  //         }
  //       });
  //   });
  // };

  if (loggedInPage) {
    return <Redirect to={loggedInPage} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
