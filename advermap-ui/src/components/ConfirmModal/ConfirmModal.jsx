import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import Heading2 from "components/Text/Heading2";

export default function ConfirmModal(props) {
  const { open, handleClose, message, handleSubmit } = props;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Modal"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description ">
            <Heading2 className="text-red-400 normal-case font-light">{message}</Heading2>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
ConfirmModal.defaultProps = {
  open: false,
  handleClose: () => {},
  handleSubmit: () => {},
  message: "hehe",
};
