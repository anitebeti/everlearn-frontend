import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../drawer/ResponsiveDrawer"
import { Box, Toolbar } from "@mui/material";
import { SnackbarComponent } from "../snackbar/SnackbarComponent";
import { AuthorCourses } from "./AuthorCourses";
import { AddCourse } from "./AddCourse";

export const AuthorPage = ({ view }) => {

    const isLoggedIn = location.state?.isLoggedIn || false;
    const unauthorised = location.state?.unauthorised || false;
    const navigate = useNavigate();

    function handleSignOut() {
        localStorage.removeItem("user");
        navigate("/signin", { state: { hasSignedOut: true }});
    }

    function handleGoToCourses() {
        navigate("/author/courses");
    }

    function handleGoToAddCourse() {
        navigate("/author/addCourse");
    }

    const authorPage = (
        <div>
            {view==="courses" && 
                <Box>
                <Toolbar />
                <AuthorCourses/>
                {isLoggedIn && <SnackbarComponent message="Logged in successfully!" severity="success" />}
                {unauthorised && <SnackbarComponent message="You don't have author rights to access this page!" severity="error" />}
                </Box> 
            }

            {view==="addCourse" &&
                <Box>
                <Toolbar />
                <AddCourse/>
                </Box> 
            }
        </div>

        

    )

    return (
        <div>
            <ResponsiveDrawer
                listItems1={['My Courses', 'Add a Course']}
                listActions1={[handleGoToCourses, handleGoToAddCourse]}
                listItems2={['Profile', 'Contact', 'Sign out']}
                listActions2={handleSignOut}
                mainBox={authorPage}
                />
        </div>

    )
}