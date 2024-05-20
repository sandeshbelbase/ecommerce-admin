import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export const CustomInput = ({
  name,
  control,
  type,
  label,
  fullWidth,
  defaultValue,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          type={type}
          onChange={onChange}
          fullWidth={fullWidth}
          label={label}
          size="medium"
          defaultValue={defaultValue}
          InputLabelProps={{
          	shrink: true,
          }}
          name={name}
          value={value}
          variant="outlined"
          {...props}
        />
      )}
    />
  );
};
