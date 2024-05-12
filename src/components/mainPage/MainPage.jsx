import { Box, Toolbar, Typography } from "@mui/material"
import { Courses } from "../courses/Courses"
import ResponsiveDrawer from "../drawer/ResponsiveDrawer";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SnackbarComponent } from "../snackbar/SnackbarComponent";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL, DRAWER_ITEMS_2, USER_DRAWER_ITEMS_1, USER_GET_NON_SUBSCRIBED_COURSES, USER_GET_PHOTO, USER_GET_SUBSCRIBED_COURSES, useDrawerActions2 } from "../../utils/utils";

export const MainPage = () => {

    const location = useLocation();
    const isLoggedIn = location.state?.isLoggedIn || false;
    const unauthorised = location.state?.unauthorised || false;
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const user = JSON.parse(localStorage.getItem("user"));
    const listActions2 = useDrawerActions2();
    const navigate = useNavigate();

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        axios.get(BASE_URL)
        .then(response => console.log('Main page data:', response.data))
        .catch(error =>  console.error('Error fetching main page data:', error)) 
    }, [])

    function handleGoToMyCourses() {
        navigate("/");
    }
    

    const mainPage = (
        <Box>
            <Toolbar />

            <Typography variant='h6' paragraph align="center">My Courses</Typography>
            <Courses url={`${USER_GET_SUBSCRIBED_COURSES}/${user.id}`} subscribed={true}/>
    
            <Typography variant='h6' paragraph align="center">Others</Typography>
            <Courses url={`${USER_GET_NON_SUBSCRIBED_COURSES}/${user.id}`} subscribed={false}/>

            {isLoggedIn && <SnackbarComponent message="Logged in successfully!" severity="success" />}
            {unauthorised && <SnackbarComponent message="You don't have rights to access this page!" severity="error" />}
      </Box> 
    );
    
    if (isAuthenticated) {
        return (
            <div>
                <ResponsiveDrawer
                listItems1={USER_DRAWER_ITEMS_1}
                listActions1={[handleGoToMyCourses]}
                listItems2={DRAWER_ITEMS_2}
                listActions2={listActions2}
                mainBox={mainPage}
                />
            </div>
        )
    } else {
        return <Navigate to="/signin" />;
    }
    
}