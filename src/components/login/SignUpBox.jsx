import { Button, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordField } from "./PasswordField";

export const SignUpBox = () => {
    const SIGNUP_URL = "http://localhost:8080/signup";
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = () => {
        axios.post(SIGNUP_URL, {firstName, lastName, email, phoneNumber, password})
            .then(console.log('User signed up successfully!'))
            .catch(error => console.error('Failed to sign up user', error));
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
        </div>
    )
}