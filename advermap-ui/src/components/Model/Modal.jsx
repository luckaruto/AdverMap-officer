import React from "react";
import PropTypes from "prop-types";

import ReactDOM from "react-dom";
// @ts-ignore
const Backdrop = (props) => {
  return (
    <div
      className="backdropTeacher bg-black bg-opacity-[55%]"
      onClick={props.HandleFalse}
    />
  );
};

export default function Modal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop HandleFalse={props.HandleFalse} />,
        document.getElementById("root_1")
      )}
      {ReactDOM.createPortal(
        <>
          <div className=" modalTeacher hover:shadow-bs1 h-[80%] flex flex-row items-center justify-center">
            {props.children}
          </div>
        </>,
        document.getElementById("root_2")
      )}
    </React.Fragment>
  );
}

Modal.propTypes = {
  HandleFalse: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
