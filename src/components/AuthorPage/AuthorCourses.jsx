import { Box, Button, Card, CardActions, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { AUTHOR_GET_AUTHOR_COURSE_LIST, UNAUTHORISED } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";

export const AuthorCourses = () => {

    const [rows, setRows] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    function createData(id, name, description, url, participants) {
        return { id, name, description, url, participants };
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        axios.get(AUTHOR_GET_AUTHOR_COURSE_LIST, { params: { userId: user.id}})
        .then(response => {
            console.log("Courses successfully fetched!", response);
            const courses = response.data.map(data => createData(data.course.id, data.course.name, data.course.description, data.course.url, data.userIds.length));
            setRows(courses);
        })
        .catch(error => {
            console.log("Error occured while accessing author page.", error);
            if (error.response.status === UNAUTHORISED) {
                navigate("/", { state: { unauthorised: true }});
            }
        })

    },[]);

    return (
        <Box>
            <Toolbar/>
            <Toolbar>
                <Typography variant="h6" component="div">My Courses</Typography>
            </Toolbar>

            {rows.length === 0 && 
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            No course added yet.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to="/author/addCourse">
                            <Button size="small">Add a course</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Box>}


            {rows.length !== 0 && 
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Participants</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <Link to={row.url} target="_blank">
                                    {row.name}
                                </Link>
                            </TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.participants}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }

        </Box>
    )
}