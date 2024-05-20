import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { FormHelperText, TextField } from "@mui/material";

export const CustomHiddenInput = forwardRef((props, ref) => {
  const {
    name,
    control,
    type = "text",
    errors,
    placeholder = null,
    label = "",
    fullWidth = true,
    defaultValue,
    rule = { required: false },
    isMultiple=false
  } = props;

  return (
    <>
      <div>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => {
            return (
              <input
                type={type}
                onChange={(e) => {
                  if(isMultiple){
                    onChange([...e.target.files]);
                  }else{
                    onChange(e.target.files)
                  }
                }}
                fullWidth={fullWidth}
                placeholder={placeholder}
                label={label}
                size="medium"
                ref={ref}
                // InputLabelProps={{
                //     shrink: true,
                // }}
                variant="outlined"
                multiple={isMultiple}
                {...props}
              />
            );
          }}
          rules={rule}
        />
        {/* {errors[name] && errors[name].type === "required" && (
          <FormHelperText
            style={{ color: "red" }}
          >{`${name} is required`}</FormHelperText>
        )} */}
      </div>
    </>
  );
});
