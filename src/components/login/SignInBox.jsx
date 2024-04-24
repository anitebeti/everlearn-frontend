import { Button, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { PasswordField } from "./PasswordField";
import axios from "axios";
import { useState } from "react";
import { SnackbarComponent } from "../snackbar/SnackbarComponent";

export const SignInBox = () => {
    const SIGNIN_URL = "http://localhost:8080/signin";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [correctCredentials, setCorrectCredentials] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = () => {
        axios.post(SIGNIN_URL, {email, password})
        .then(() => {
            console.log('User signed up successfully!');
            navigate("/");
        })
        .catch(error => {
            //daca sunt credentialele gresite - verifica ceva cod
            console.error('Failed to sign up user', error);
            setCorrectCredentials(false);
        });
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

            <Typography variant="caption" display="block" gutterBottom sx={{ ml: 'auto', mt: 2 }}>Don't have an account?</Typography>
            <Typography variant="caption" display="block" gutterBottom onClick={() => navigate("/signup")} sx={{ ml: 'auto', cursor: 'pointer' }}>Click here to sign up.</Typography> 

            {correctCredentials === false && <SnackbarComponent message='Incorrect email or password!' severity='error'/>}
        </div>
    )

}