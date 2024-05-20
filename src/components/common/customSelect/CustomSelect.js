import React from "react";
import { Controller } from "react-hook-form";
import { FormHelperText, MenuItem, TextField } from "@mui/material";

export const CustomSelect = ({
  name,
  control,
  errors,
  placeholder = null,
  label = "",
  options,
  fullWidth = true,
  rule = { required: false },
}) => {

    return (
        <>
            <Controller
                name={name}
                control={control}
                options={options}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                    <TextField
                        select
                        onChange={onChange}
                        fullWidth={fullWidth}
                        placeholder={placeholder}
                        label={label}
                        value={value}
                        defaultValue={value}
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        variant="outlined"
                    >
                        {options?.map((item, index) => (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        ))}
                    </TextField>
                )}
                rules={rule}
            />
            {/* {errors[name] && errors[name].type === "required" && (
          <FormHelperText
            style={{ color: "red" }}
          >{`${name} is required`}</FormHelperText>
        )} */}
    </>
  );
};
