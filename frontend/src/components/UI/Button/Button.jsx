import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const { children, onClick } = props;

  return (
    <button className={classes["button"]} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
