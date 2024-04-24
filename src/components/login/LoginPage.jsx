import { Box, Paper } from "@mui/material"
import { SignInBox } from "./SignInBox";
import { SignUpBox } from "./SignUpBox";

export const LoginPage = ({ loginAction }) => {

    //TODO: ADD FORGOT PSW

    const backgroundStyle = {
        margin: 0,
        padding: 0,
        backgroundImage: "url('/media/login-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        height: '100vh',
        width: '100vw',
    };

    const paperStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }

    return (
        <Box style={backgroundStyle}>
            <Box sx={paperStyle}>
                <Paper elevation={24} sx={{ p: 4}}>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '25ch' }, }} noValidate autoComplete="off">
                        {loginAction === "signin" && (<SignInBox/>)}
                        {loginAction === "signup" && (<SignUpBox/>)}
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
    
};