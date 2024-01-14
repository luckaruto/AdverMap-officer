// @ts-nocheck
// DistrictForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSnackbar } from "redux/appSlice";
import { DistrictService } from "services/district/DistrictService";
import BasicSelect from "components/Select/BasicSelect";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// @ts-ignore
import { fetchDistricts } from "redux/DistrictSlice";
import { fetchCities } from "redux/citySlice";
import BasicInput from "components/Input/BasicInput";
import { useFormContext, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DistrictForm = ({ open, handleClose, existData }) => {
  const [districtName, setDistrictName] = useState(existData ? existData.name : "");
  const [cityId, setCityId] = useState(existData ? existData.city.id : "");

  const dispatch = useDispatch();
  const { entities: cities } = useSelector((state) => state.cities);
  useEffect(() => {
    setDistrictName(existData ? existData.name : "");
    setCityId(existData ? existData.city.id : "");
  }, [existData]);

  useEffect(() => {
    dispatch(fetchCities({}));
  }, []);
  

  async function handleSave() {

    dispatch(setLoading(true));

    try {
      if (existData) {
        // Edit existing city
        await DistrictService.editDistrict(existData.id, { name: districtName, cityId });
        dispatch(setSnackbar({ status: "success", message: "District updated!" }));
      } else {
        // Create new city
        await DistrictService.createDistrict({ name: districtName, cityId });
        dispatch(setSnackbar({ status: "success", message: "District created!" }));
      }

      dispatch(
        fetchDistricts({})
      );
      dispatch(
        fetchCities({})
      );
      handleClose();
    } catch (error) {
      dispatch(setSnackbar({ status: "error", message: error }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{existData ? "Edit District" : "Add New District"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="District Name"
          variant="outlined"
          value={districtName}
          onChange={(e) => setDistrictName(e.target.value)}
          className="mb-4"
        />
        <InputLabel id="demo-simple-select-label">Thành phố</InputLabel>
          <Select
            label={"Thành phố"}
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
          >
            {cities &&
              cities.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
       </Select>
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
DistrictForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  existData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default DistrictForm;
