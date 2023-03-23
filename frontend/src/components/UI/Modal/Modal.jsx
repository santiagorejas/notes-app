import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return (
    <div
      className={classes["backdrop"]}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
        }
      }}
    >
      {props.children}
    </div>
  );
};

const Modal = (props) => {
  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <Backdrop onClose={props.onClose}>
      <div className={classes["modal"]}>{props.children}</div>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;
