import { Box, Toolbar, Typography } from "@mui/material"
import { MyCourses } from "../courses/MyCourses"
import ResponsiveDrawer from "../drawer/ResponsiveDrawer";

export const MainPage = () => {

    const mainPage = (
        <Box>
            <Toolbar />
            <Typography paragraph align="center" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>CURSURILE MELE </Typography>
            <MyCourses/>
    
            <Typography paragraph align="center" sx={{ fontWeight: 'bold', fontSize: '2rem' }}>NOUTATI</Typography>
            <MyCourses/>
      </Box> 
    );
    
    return (
        <ResponsiveDrawer
        listItems1={['Cursurile mele', 'Noutati']}
        listItems2={['Profil', 'Contact']}
        mainBox={mainPage}
        />
    );
}