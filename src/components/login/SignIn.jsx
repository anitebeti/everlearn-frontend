import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react";

export const SignIn = () => {

    const [isSignUp, setIsSignUp] = useState(false);

    //TODO: ADD FORGOT PSW

    const backgroundStyle = {
        margin: 0,
        padding: 0,
        backgroundImage: "url('/media/login-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
    };

    const paperStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }

    const handleSignUpClick = () => {
        setIsSignUp(true);
    }

    return (
        <Box style={backgroundStyle}>
            <Box sx={paperStyle}>
                <Paper elevation={24} sx={{ p: 4}}>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' }, }} noValidate autoComplete="off">
                        {!isSignUp && (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                <Typography variant="h5" noWrap component="div" sx={{ mr: 'auto' }}>Sign In</Typography>
                                <TextField required id="outlined-required" label="email"/>
                                <TextField required id="outlined-required" label="password"/>
                                <Button variant="contained" sx={{ width: '25ch', height: '56px' }}>Sign In</Button>
                                <Typography variant="caption" display="block" gutterBottom sx={{ ml: 'auto', mt: 2 }}>Don't have an account?</Typography>
                                <Typography variant="caption" display="block" gutterBottom onClick={handleSignUpClick} sx={{ ml: 'auto', cursor: 'pointer' }}>Click here to sign up.</Typography> 
                            </div>

                        )}
                         
                        {isSignUp && (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                <Typography variant="h5" noWrap component="div" sx={{ mr: 'auto' }}>Sign Up</Typography>
                                <TextField required id="outlined-required" label="email"/>
                                <TextField required id="outlined-required" label="first name"/>
                                <TextField required id="outlined-required" label="last name"/>
                                <TextField required id="outlined-required" label="password"/>
                                <Button variant="contained" sx={{ width: '25ch', height: '56px' }}>Sign Up</Button>
                            </div>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
    
};