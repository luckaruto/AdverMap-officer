import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import PropTypes from "prop-types";

const Selector = ({ label, data, selectedValue, onChange }) => (
	<FormControl fullWidth>
	  <InputLabel>{label}</InputLabel>
	  <Select label={label} value={selectedValue || ""} onChange={onChange}>
		{/* Explicitly set the value to an empty string for the MenuItem */}
		<MenuItem value="">
		  <em>None</em>
		</MenuItem>
		{data.map((item) => (
		  <MenuItem key={item.name} value={item}>
			{item.name}
		  </MenuItem>
		))}
	  </Select>
	</FormControl>
  );

Selector.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedValue: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};
export default Selector