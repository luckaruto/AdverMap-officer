// @ts-nocheck
// WardForm.jsx
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
import { WardService } from "services/ward/WardService";
import BasicSelect from "components/Select/BasicSelect";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// @ts-ignore
import { fetchWards } from "redux/WardSlice";
import { fetchDistricts } from "redux/DistrictSlice";
import BasicInput from "components/Input/BasicInput";
import { useFormContext, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const WardForm = ({ open, handleClose, existData }) => {
  const [wardName, setWardName] = useState(existData ? existData.name : "");
  const [districtId, setDistrictId] = useState(existData ? existData.district.id : "");
  console.log("🚀 ~ WardForm ~ districtId:", districtId)

  const dispatch = useDispatch();
  const { entities: districts } = useSelector((state) => state.districts);
  useEffect(() => {
    setWardName(existData ? existData.name : "");
    setDistrictId(existData ? existData.district.id : "");
  }, [existData]);

  useEffect(() => {
    dispatch(fetchDistricts({}));
  }, []);
  

  async function handleSave() {

    dispatch(setLoading(true));

    try {
      if (existData) {
        // Edit existing district
        await WardService.editWard(existData.id, { name: wardName, districtId });
        dispatch(setSnackbar({ status: "success", message: "Ward updated!" }));
      } else {
        // Create new district
        await WardService.createWard({ name: wardName, districtId });
        dispatch(setSnackbar({ status: "success", message: "Ward created!" }));
      }

      dispatch(
        fetchWards({})
      );
      dispatch(
        fetchDistricts({})
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
      <DialogTitle>{existData ? "Edit Ward" : "Add New Ward"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Ward Name"
          variant="outlined"
          value={wardName}
          onChange={(e) => setWardName(e.target.value)}
          className="mb-4"
        />
        <InputLabel id="demo-simple-select-label">Thành phố</InputLabel>
          <Select
            label={"Quận/Huyện"}
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
          >
            {districts &&
              districts.map((item) => (
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
WardForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  existData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default WardForm;
