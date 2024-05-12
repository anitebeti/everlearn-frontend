import { useEffect, useState } from "react";
import { ADMIN_DRAWER_ITEMS_1, AUTHOR_DRAWER_ITEMS_1, DRAWER_ITEMS_2, USER_ADD_PHOTO, USER_DRAWER_ITEMS_1, USER_EDIT_INFO, useDrawerActions2 } from "../../utils/utils";
import ResponsiveDrawer from "../drawer/ResponsiveDrawer"
import { Avatar, Box, Button, Paper, Stack, TextField, Toolbar, Typography, styled } from "@mui/material";
import axios from "axios";

export const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [photo, setPhoto] = useState();
    const user = JSON.parse(localStorage.getItem("user"));
    const [drawerItems1, setDrawerItems1] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [wasPhotoSet, setWasPhotoSet] = useState(false);
    const [photoUrl, setPhotoUrl] = useState();
    const listActions2 = useDrawerActions2();

    useEffect(() => {
        if (user.roles.includes('ADMIN')) {
            setDrawerItems1(ADMIN_DRAWER_ITEMS_1);
        } else if (user.roles.includes('AUTHOR')) {
            setDrawerItems1(AUTHOR_DRAWER_ITEMS_1);
        } else {
            setDrawerItems1(USER_DRAWER_ITEMS_1);
        }

        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        console.log("PHOTO, ", user.photoUrl)
    },[])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        fontSize: '16px',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'row'
    }));

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const row = (rowName, rowData, setter) => (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Item sx={{ width: '40%' }}>{rowName}</Item>
            {(isEditing && rowName !== 'Active Roles') ? (
                <TextField 
                    sx={{ width: '40%' }} 
                    defaultValue={rowData}
                    onChange={e => setter(e.target.value)}
                />
            ) : (
                <Item sx={{ width: '40%' }}>{rowData}</Item>
            )}
        </div>
    )

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
        setWasPhotoSet(true);
        setPhotoUrl(URL.createObjectURL(event.target.files[0]));
    }

    const handleSave = () => {
        if (wasPhotoSet) {
            const formData = new FormData();
            formData.append('userId', user.id);
            formData.append('photo', photo);
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            axios.post(USER_ADD_PHOTO, formData, { headers: { 'Content-Type': 'multipart/form-data' }})
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

        axios.put(USER_EDIT_INFO, { id: user.id, firstName, lastName, email, phoneNumber })
        .then(response => {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.phoneNumber = phoneNumber;
            localStorage.setItem("user", JSON.stringify(user));
            console.log("Successfully updated user info!", response);
        })
        .catch(error => console.error(error));

        setIsEditing(false);
        setWasPhotoSet(false);
        // window.location.reload();
    }


    const profilePage = (
        <div>
            <Toolbar />
            <Box sx={{ width: '100%'}}>
                <Stack spacing={2}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: "center"}}>
                        <Avatar
                        alt="Remy Sharp"
                        src={ wasPhotoSet ? photoUrl : user.photoUrl }
                        sx={{ width: 100, height: 100 }}
                        />
                    </div>
                    {isEditing && (
                        <Button
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        >Add a photo
                            <VisuallyHiddenInput type="file" onChange={handlePhotoChange}
                            // {(event) => {
                            //     setPhoto(event.target.files[0]);
                            //     setWasPhotoSet(true)}}
                                />
                        </Button>)}
                    {!isEditing && (<div style={{ marginTop: '50px' }}></div>)}

                    {row('First Name', user.firstName, setFirstName)}
                    {row('Last Name', user.lastName, setLastName)}
                    {row('Active Roles', user.roles)}
                    {row('Email', user.email, setEmail)}
                    {row('Phone number', user.phoneNumber, setPhoneNumber)}
            
                    {!isEditing && <Button onClick={handleEdit}>Edit</Button>}
                    {isEditing && <Button onClick={handleSave}>Save</Button>}
                    
                </Stack>
            </Box>
        </div>
    )

    return (
        <div>
            <ResponsiveDrawer
            listItems1={drawerItems1}
            listActions1={[]}
            listItems2={DRAWER_ITEMS_2}
            listActions2={listActions2}
            mainBox={profilePage}
            />
        </div>
    )
}

