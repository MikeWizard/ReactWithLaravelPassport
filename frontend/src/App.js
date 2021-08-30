import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // NavLink,
} from "react-router-dom";
import Login from "./components/Login";
import Books from "./components/Books/BookList";
import Users from "./components/Users/UserList";
import { TokenContextProvider } from "./store/auth-context";
const App = () => {
  // const [token, setToken] = React.useState("");

  return (
    <TokenContextProvider>
      <Router>
        <Switch>
          <Route path="/books" render={(props) => <Books {...props} />} />
          <Route path="/users" render={(props) => <Users {...props} />} />
          {/* <Route path="/login" render={(props) => <Login {...props} />} /> */}
          <Route path="/" render={(props) => <Login {...props} />} />
        </Switch>
      </Router>
    </TokenContextProvider>
  );
};
export default App;
