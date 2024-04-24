import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react";

export const PasswordField = ({ password, setPassword }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    return (
        <div>
            <TextField required 
                label="password" 
                type="password"
                value={password} 
                onChange={e => setPassword(e.target.value)}
                style={{ display: showPassword ? 'none' : 'block' }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                <Visibility />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <TextField required 
                label="password" 
                type="text"
                value={password} 
                onChange={e => setPassword(e.target.value)}
                style={{ display: showPassword ? 'block' : 'none' }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                <VisibilityOff />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}