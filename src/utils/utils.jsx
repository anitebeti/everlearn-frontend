import { useNavigate } from "react-router-dom";

export const BASE_URL = "http://localhost:8080";
export const SIGNIN_URL = BASE_URL + "/signin";
export const SIGNUP_URL = BASE_URL + "/signup";

export const USER_GET_NON_SUBSCRIBED_COURSES = BASE_URL + "/getNonSubscribedCourses";
export const USER_GET_SUBSCRIBED_COURSES = BASE_URL + "/getSubscribedCourses";
export const USER_SUBSCRIBE = BASE_URL + "/subscribe";
export const USER_EDIT_INFO = BASE_URL + "/user/editInfo";
export const USER_ADD_PHOTO = BASE_URL + "/user/addPhoto";
export const USER_GET_PHOTO = BASE_URL + "/user/photo";

export const ADMIN_DASHBOARD_URL = BASE_URL + "/admin";
export const ADMIN_CHANGE_ROLES = ADMIN_DASHBOARD_URL + "/changeRoles";

export const AUTHOR_BASE_URL = BASE_URL + "/author";
export const AUTHOR_GET_AUTHOR_COURSE_LIST = AUTHOR_BASE_URL + "/courses";
export const AUTHOR_ADD_COURSE = AUTHOR_BASE_URL + "/addCourse";



export const OK = 200;

export const BAD_CREDENTIALS = 400;
export const UNAUTHORISED = 401;
export const FORBIDDEN = 403;
export const CONFLICT = 409;
export const PRECONDITION_FAILED = 412;

export const USER_DRAWER_ITEMS_1 = ['My Courses'];
export const AUTHOR_DRAWER_ITEMS_1 = ['My Courses', 'Add a Course'];
export const ADMIN_DRAWER_ITEMS_1 = ['Users'];
export const DRAWER_ITEMS_2 = ['Profile', 'Sign out'];

export function useDrawerActions2() {
    const navigate = useNavigate();

    function handleSignOut() {
        localStorage.removeItem("user");
        navigate("/signin", { state: { hasSignedOut: true }});
    }

    function handleGoToProfilePage() {
        navigate("/profile");
    }

    return [handleGoToProfilePage, handleSignOut];
}


