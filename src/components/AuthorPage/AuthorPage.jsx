import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../drawer/ResponsiveDrawer"
import { Box, Toolbar } from "@mui/material";
import { SnackbarComponent } from "../snackbar/SnackbarComponent";
import { AuthorCourses } from "./AuthorCourses";
import { AddCourse } from "./AddCourse";
import { AUTHOR_DRAWER_ITEMS_1, DRAWER_ITEMS_2, useDrawerActions2 } from "../../utils/utils";

export const AuthorPage = ({ view }) => {

    const isLoggedIn = location.state?.isLoggedIn || false;
    const unauthorised = location.state?.unauthorised || false;
    const listActions2 = useDrawerActions2();
    const navigate = useNavigate();

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
                listItems1={AUTHOR_DRAWER_ITEMS_1}
                listActions1={[handleGoToCourses, handleGoToAddCourse]}
                listItems2={DRAWER_ITEMS_2}
                listActions2={listActions2}
                mainBox={authorPage}
                />
        </div>

    )
}