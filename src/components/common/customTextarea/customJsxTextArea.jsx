import TextField from "@mui/material/TextField";
import React from "react";
import { Controller } from "react-hook-form";

export const CustomTextareaJSX = ({
	name,
	label,
	control,
	rows,
	defaultValue,
	rule,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			render={({ field: { onChange, value } }) => (
				<TextField
					sx={{ fontSize: "30px !important" }}
					id='outlined-multiline-static'
					label={label}
					multiline
					fullWidth
					value={value}
					onChange={onChange}
					InputLabelProps={{
						shrink: true,
					}}
					variant='outlined'
					rows={rows || 4}
				/>
			)}
			rules={rule}
		/>
	);
};