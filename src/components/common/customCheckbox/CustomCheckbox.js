import { Checkbox, FormControlLabel } from "@mui/material";
// import { makeStyles } from "@mui/styles";

import React from "react";
import { Controller } from "react-hook-form";

export default function CustomCheckbox({ name, control, defaultValue, label }) {
  return (
    <>
      {/* <div className={classes.root}> */}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={value}
                onChange={onChange}
                variant="outlined"
              />
            }
            label={label}
          />
        )}
      />
    </>
  );
}
