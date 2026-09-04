import React from "react";
import "./Toast.css";

function Toast({ success, message }) {
  if(!message) return null;

  return (
    <div className={"cart-toast" + (success == true ? " success" : " error")} id="cart-toast-alert">
      <i className={success == true ? "fa-solid fa-circle-check" : "fa-solid fa-circle-xmark"}></i> {message}
    </div>
  );
}

export default Toast;
