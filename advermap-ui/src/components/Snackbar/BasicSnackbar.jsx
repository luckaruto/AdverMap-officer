import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const BasicSnackbar = (props) => {
  const { message, status,id } = props;

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (message) {
      setOpen(true);
      // Close the SlideMessage after 3 seconds
      const timeoutId = setTimeout(() => {
        setOpen(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [status, message, id]);

  return (
    <Snackbar TransitionComponent={SlideTransition} open={open}>
      <Alert severity={status} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

BasicSnackbar.propTypes = {
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  id: PropTypes.any,
};
BasicSnackbar.defaultProps = {
  message: "hehe",
  status: "info",
};

export default BasicSnackbar;
