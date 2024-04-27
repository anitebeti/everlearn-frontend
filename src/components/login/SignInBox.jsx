import { Button, TextField, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { PasswordField } from "./PasswordField";
import axios from "axios";
import { useState } from "react";
import { SnackbarComponent } from "../snackbar/SnackbarComponent";
import { BAD_CREDENTIALS, PRECONDITION_FAILED, SIGNIN_URL } from "../../utils/utils";

export const SignInBox = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [statusCode, setStatusCode] = useState();

    const location = useLocation();
    const isSignedUp = location.state?.isSignedUp || false;

    const navigate = useNavigate();


    const handleSignIn = () => {

        if (!email || !password) {
            setStatusCode(PRECONDITION_FAILED);
        } else {
            axios.post(SIGNIN_URL, {email, password})
            .then(() => {
                console.log('User signed in successfully!');
                const isLoggedIn = true;
                navigate("/", { state: { isLoggedIn }});
            })
            .catch(error => {
                console.error('Failed to sign up user', error);
                setStatusCode(error.response.status);
            });
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>

            <Typography variant="h5" noWrap component="div" sx={{ mr: 'auto' }}>Sign In</Typography>

            <TextField required 
                label="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <PasswordField password={password} setPassword={setPassword}/>

            <Button variant="contained" sx={{ width: '25ch', height: '56px' }} onClick={handleSignIn}>Sign In</Button>

            {!isSignedUp && (
                <div>
                    <Typography variant="caption" display="block" gutterBottom sx={{ ml: 'auto', mt: 2 }}>Don't have an account?</Typography>
                    <Typography variant="caption" display="block" gutterBottom onClick={() => navigate("/signup")} sx={{ ml: 'auto', cursor: 'pointer' }}>Click here to sign up.</Typography> 
                </div>
            )}

            
            {isSignedUp && (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Typography variant="caption" display="block" gutterBottom sx={{ ml: 'auto', mt: 2, bgcolor: 'pink', fontStyle: 'italic', p: 1 }}>email validation under construction</Typography>
                    <SnackbarComponent message="Account successfully created. Fill in your credentials to sign in." severity="success"/>
                </div>
            )}

            {statusCode === BAD_CREDENTIALS && (<SnackbarComponent message="Incorrect email or password!" severity="error" />)}
            {statusCode === PRECONDITION_FAILED && (<SnackbarComponent message="Please fill in all the fields!" severity="warning" />)}
        </div>
    )

}