import React from "react";
import { useParams } from "react-router-dom";
const User = (props) => {
  let { userId } = useParams();
  console.log(userId);
  return <></>;
};
export default User;
