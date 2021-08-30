import React from "react";
import apiClient from "../../services";
import Book from "./Book";
import BookForm from "./BookForm";
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
const Books = (props) => {
  const AuthCtx = useContext(AuthContext);
  const [books, setBooks] = React.useState([]);
  React.useEffect(() => {
    apiClient
      .get("/api/book")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  const bookList = books.map((book) => <li key={book.id}>{book.title}</li>);
  let output = <div>You are not logged in.</div>;
  if (AuthCtx.isAdmin()) {
    output = <ul>{bookList}</ul>;
  }
  let form = <BookForm />;

  let match = useRouteMatch();
  // console.log(AuthCtx.token);
  return (
    <Layout>
      <Switch>
        <Route path={`${match.path}/create`}>{form}</Route>
        <Route path={`${match.path}/:bookId`}>
          <Book />
        </Route>
        <Route path={match.path}>
          <h3>Please select a book.</h3>
        </Route>
      </Switch>
      {output}
    </Layout>
  );
};
export default Books;
