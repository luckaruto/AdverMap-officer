import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSnackbar } from "../../redux/appSlice";
import { CityService } from "../../services/city/CityService";
import { fetchCities } from "../../redux/citySlice";
import {testParams} from "../../services/apis/constants";

const CityForm = ({ open, handleClose, existData }) => {
    const [cityName, setCityName] = useState("");

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.appState);

    useEffect(() => {
        if (existData) {
            setCityName(existData.name);
        }
    }, [existData]);

    const handleSave = async () => {
        dispatch(setLoading(true));

        try {
            if (existData) {

                await CityService.editCity(existData.id, { name: cityName }, token);
                dispatch(setSnackbar({ status: "success", message: "City updated!" }));
            } else {
                const response = await CityService.createCity({ name: cityName }, token);

                if (response.status === 200) {
                    // Success
                    dispatch(setSnackbar({ status: "success", message: response.data.message }));
                } else {
                    // Error
                    dispatch(setSnackbar({ status: "error", message: response.data.message }));
                }
            }

            dispatch(fetchCities({ testParams, token }));
            handleClose();
        } catch (error) {
            dispatch(setSnackbar({ status: "error", message: error }));
        } finally {
            dispatch(setLoading(false));
            reset(undefined, { keepDirtyValues: true });
        }
    };


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{existData ? "Chỉnh sửa thành phố" : "Tạo mới thành phố"}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Tên thành phố"
                    variant="outlined"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    className="mb-4"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Hủy
                </Button>
                {existData ? (
                    <Button onClick={handleSave} color="primary">
                        Tạo mới
                    </Button>
                ) : (
                    <Button onClick={handleSave} color="primary">
                        Lưu chỉnh sửa
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

CityForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    existData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }),
};

export default CityForm;


