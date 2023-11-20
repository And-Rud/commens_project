import React from "react";
import "./MyAlert.css";

const MyAlert = ({children}) => {
  return (
    <div className="alert">{children}</div>
  );
};

export default MyAlert;
