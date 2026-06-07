import React from "react";
import "./Toast.css";

function Toast({ message, error }) {
  if(!message && !error) return null;

  return (
    <div className={"cart-toast" + (message ? " success" : " error")} id="cart-toast-alert">
      <i className={message ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"}></i> {message ? message : error}
    </div>
  );
}

export default Toast;
