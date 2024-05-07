export const BASE_URL = "http://localhost:8080";
export const SIGNIN_URL = BASE_URL + "/signin";
export const SIGNUP_URL = BASE_URL + "/signup";

export const USER_GET_ALL_COURSES = BASE_URL + "/getAllCourses";
export const USER_SUBSCRIBE = BASE_URL + "/subscribe";

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
