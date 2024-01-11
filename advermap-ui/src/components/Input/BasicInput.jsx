import React from "react";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const BasicInput = (props) => {
  const { label, name, type } = props;

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
          <TextField
            type={type}
            label={label}
            value={field.value || ""}
            onChange={field.onChange}
            inputRef={field.ref}
          />
          {errors[name] && (
            <FormHelperText error>{`${errors[name].message}`}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
BasicInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.any,
};
BasicInput.defaultProps = {
  label: "Label",
  name: "",
  type: "text",
};
export default BasicInput;
