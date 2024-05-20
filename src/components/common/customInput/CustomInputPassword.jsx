import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const CustomInputPassword = ({ name, placeholder, control, label }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div >
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <TextField
                        fullWidth
                        name={name}
                        placeholder={placeholder}
                        variant="outlined"
                        value={value}
                        label={label}
                        onChange={onChange}
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleShowPassword()}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </div>
    );
};

export default CustomInputPassword;
