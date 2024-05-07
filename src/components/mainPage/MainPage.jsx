import { Box, Toolbar, Typography } from "@mui/material"
import { Courses } from "../courses/Courses"
import ResponsiveDrawer from "../drawer/ResponsiveDrawer";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SnackbarComponent } from "../snackbar/SnackbarComponent";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL, USER_GET_ALL_COURSES } from "../../utils/utils";

export const MainPage = () => {

    const location = useLocation();
    const isLoggedIn = location.state?.isLoggedIn || false;
    const unauthorised = location.state?.unauthorised || false;
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(BASE_URL, { params: { id: user.id}})
        .then(response => {
            console.log('Main page data:', response.data);
        })
        .catch(error => {
            console.error('Error fetching main page data:', error);
        });
    }, [])

    function handleSignOut () {
        localStorage.removeItem("user");
        navigate("/signin", { state: { hasSignedOut: true }});
    }

    const mainPage = (
        <Box>
            <Toolbar />
            <Typography paragraph align="center" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>My Courses</Typography>
            {/* <MyCourses/> */}
    
            <Typography paragraph align="center" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Others</Typography>
            <Courses url={USER_GET_ALL_COURSES}/>
            {isLoggedIn && <SnackbarComponent message="Logged in successfully!" severity="success" />}
            {unauthorised && <SnackbarComponent message="You don't have rights to access this page!" severity="error" />}
      </Box> 
    );
    
    if (isAuthenticated) {
        return (
            <div>
                <ResponsiveDrawer
                listItems1={['My Courses', 'Others']}
                listActions1={[]}
                listItems2={['Profile', 'Contact', 'Sign out']}
                listActions2={handleSignOut}
                mainBox={mainPage}
                />
            </div>
        )
    } else {
        return <Navigate to="/signin" />;
    }
    
}