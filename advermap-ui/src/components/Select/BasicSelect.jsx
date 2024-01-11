import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

const BasicSelect = (props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { items, format, label, name } = props;

  return (
    <Controller
      control={control}
      name={name} 
      render={({ field: { value, onChange } }) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            defaultValue={items[0]}
            label={label}
            value={value}
            onChange={onChange}
          >
            {items &&
              items.map((item) => (
                <MenuItem key={item} value={item}>
                  {format(item)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    />
  );
};
BasicSelect.propTypes = {
  items: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  format: PropTypes.func.isRequired,
};
BasicSelect.defaultProps = {
  items: [],
  format: () => {},
  label: "Label",
  name: "",
};
export default BasicSelect;
