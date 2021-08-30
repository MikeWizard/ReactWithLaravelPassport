import React from "react";
import { useParams } from "react-router-dom";
const Book = (props) => {
  let { bookId } = useParams();
  console.log(bookId);
  return <></>;
};
export default Book;
