import { Button, TextField, Typography, styled } from "@mui/material"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useState } from "react"
import axios from "axios";
import { AUTHOR_ADD_COURSE } from "../../utils/utils";

export const AddCourse = () => {
    const [courseName, setCourseName] = useState();
    const [description, setDescription] = useState();
    const [file, setFile] = useState();
    const user = JSON.parse(localStorage.getItem("user"));


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

    function handleAddCourse() {
        const formData = new FormData();
        formData.append('courseName', courseName);
        formData.append('description', description);
        formData.append('file', file);
        formData.append('authorEmail', user.email);

        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

        axios.post(AUTHOR_ADD_COURSE, formData, { headers: { 'Content-Type': 'multipart/form-data' }})
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    }

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-evenly', 
            alignItems: 'center',
            gap: '40px'}}>

            <Typography variant="h5" noWrap component="div">Add course</Typography>
            <TextField required 
                label="course name" 
                value={courseName} 
                onChange={e => setCourseName(e.target.value)}
            />
            <TextField
                label="description"
                multiline
                rows={4}
                value={description} 
                onChange={e => setDescription(e.target.value)}
            />

            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<DriveFolderUploadIcon />}
                sx={{ width: '25ch', height: '56px' }}
            >Upload file
            <VisuallyHiddenInput type="file" onChange={(event) => setFile(event.target.files[0])}/>
            </Button>

            <Button variant="contained" sx={{ width: '25ch', height: '56px' }} onClick={handleAddCourse}>Add course</Button>
    
            {file && 
            <Typography 
                variant="body2" 
                gutterBottom 
                sx={{ fontWeight: 'light', m: 1 }}>File uploaded: {file.name}</Typography>}
            {/* {alert === false && statusCode === PRECONDITION_FAILED && <SnackbarComponent message='Please fill in all the fields!' severity='warning'/>}
            {alert === false && statusCode === CONFLICT && <SnackbarComponent message='An user already exists with this email' severity='error'/>} */}
        </div>
    )
}