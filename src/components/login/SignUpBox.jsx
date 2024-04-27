import { Button, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { PasswordField } from "./PasswordField";
import { CONFLICT, PRECONDITION_FAILED, SIGNUP_URL } from "../../utils/utils";
import { SnackbarComponent } from "../snackbar/SnackbarComponent";
import { useNavigate } from "react-router-dom";

export const SignUpBox = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [statusCode, setStatusCode] = useState();
    const navigate = useNavigate();

    const handleSignUp = () => {
        if (!firstName || !lastName || !email || !phoneNumber || !password) {
            setAlert(false);
            setStatusCode(412);
        } else {
            axios.post(SIGNUP_URL, {firstName, lastName, email, phoneNumber, password})
                .then(() => {
                    console.log('User signed up successfully!');
                    const isSignedUp = true;
                    navigate("/signIn", { state: { isSignedUp }});
                })
                .catch(error => {
                    console.error('Failed to sign up user', error);
                    setStatusCode(error.response.status);
                    setAlert(false);
                })
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Typography variant="h5" noWrap component="div" sx={{ mr: 'auto' }}>Sign Up</Typography>
            <TextField required 
                label="first name" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)}
            />
            <TextField required 
                label="last name" 
                value={lastName} 
                onChange={e => setLastName(e.target.value)}
            />
            <TextField required 
                label="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
            />
            <TextField required 
                label="phone number" 
                value={phoneNumber} 
                onChange={e => setPhoneNumber(e.target.value)}
            />

            <PasswordField password={password} setPassword={setPassword}/>

            <Button variant="contained" sx={{ width: '25ch', height: '56px' }} onClick={handleSignUp}>Sign Up</Button>
            <Typography variant="caption" display="block" gutterBottom sx={{ ml: 'auto', mt: 2 }}>Already have an account?</Typography>
            <Typography variant="caption" display="block" gutterBottom onClick={() => navigate("/signin")} sx={{ ml: 'auto', cursor: 'pointer' }}>Click here to sign in.</Typography> 

            {alert === false && statusCode === PRECONDITION_FAILED && <SnackbarComponent message='Please fill in all the fields!' severity='warning'/>}
            {alert === false && statusCode === CONFLICT && <SnackbarComponent message='An user already exists with this email' severity='error'/>}
        </div>
    )
}