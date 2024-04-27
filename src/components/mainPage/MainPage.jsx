import { Box, Toolbar, Typography } from "@mui/material"
import { MyCourses } from "../courses/MyCourses"
import ResponsiveDrawer from "../drawer/ResponsiveDrawer";
import { useLocation } from "react-router-dom";
import { SnackbarComponent } from "../snackbar/SnackbarComponent";

export const MainPage = () => {

    const location = useLocation();
    const isLoggedIn = location.state?.isLoggedIn || false;

    const mainPage = (
        <Box>
            <Toolbar />
            <Typography paragraph align="center" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>CURSURILE MELE</Typography>
            <MyCourses/>
    
            <Typography paragraph align="center" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>NOUTATI</Typography>
            <MyCourses/>
            {isLoggedIn && <SnackbarComponent message="Logged in successfully!" severity="success" />}
      </Box> 
    );
    
    return (
        <div>
            <ResponsiveDrawer
            listItems1={['Cursurile mele', 'Noutati']}
            listItems2={['Profil', 'Contact']}
            mainBox={mainPage}
            />
        </div>
    );
}