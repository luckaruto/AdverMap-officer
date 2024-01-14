// @ts-nocheck
// CityForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSnackbar } from "redux/appSlice";
import { CityService } from "services/city/CityService";
// @ts-ignore
import { fetchCities } from "redux/CitySlice";

const CityForm = ({ open, handleClose, existData }) => {
  const [cityName, setCityName] = useState(existData ? existData.name : "");
  console.log("🚀 ~ CityForm ~ existData:", existData)

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.appState);

  const handleSave = async () => {
    dispatch(setLoading(true));

    try {
      if (existData) {
        // Edit existing city
        await CityService.editCity(existData.id, { name: cityName }, token);
        dispatch(setSnackbar({ status: "success", message: "City updated!" }));
      } else {
        // Create new city
        await CityService.createCity({ name: cityName }, token);
        dispatch(setSnackbar({ status: "success", message: "City created!" }));
      }

      dispatch(
        fetchCities({
          /* Add necessary parameters here */
        })
      );
      handleClose();
    } catch (error) {
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    setCityName(existData ? existData.name : "");
  }, [existData]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{existData ? "Edit City" : "Add New City"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="City Name"
          variant="outlined"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className="mb-4"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Add prop-type validation
CityForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  existData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default CityForm;
