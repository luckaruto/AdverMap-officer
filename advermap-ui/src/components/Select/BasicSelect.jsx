import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const BasicSelect = (props) => {
  const { label, name, choices, format } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            label={label}
            value={field.value || ""}
            onChange={field.onChange}
            inputRef={field.ref}
          >
            {choices &&
              choices.map((item) => {
                return (
                  <MenuItem
                    key={item.id ? item.id : item}
                    value={item.id ? item.id : item}
                  >
                    {format(item)}
                  </MenuItem>
                );
              })}
          </Select>
          {errors[name] && (
            <FormHelperText error>{`${errors[name].message}`}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
BasicSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  format: PropTypes.func,
};
BasicSelect.defaultProps = {
  label: "Label",
  name: "",
  choices: [],
  format: (value) => value,
};
export default BasicSelect;
