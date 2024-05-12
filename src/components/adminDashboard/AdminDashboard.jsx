import { useEffect, useState } from "react";
import ResponsiveDrawer from "../drawer/ResponsiveDrawer"
import { Box, Button, FormControl, FormControlLabel, FormGroup, IconButton, Input, InputLabel, MenuItem, Modal, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation, useNavigate } from "react-router-dom";
import { SnackbarComponent } from "../snackbar/SnackbarComponent";
import { ADMIN_CHANGE_ROLES, ADMIN_DASHBOARD_URL, ADMIN_DRAWER_ITEMS_1, DRAWER_ITEMS_2, OK, UNAUTHORISED, useDrawerActions2 } from "../../utils/utils";
import axios from "axios";

export const AdminDashboard = () => {
    const [rows, setRows] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isFilterSelectOpen, setIsFilterSelectOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState();
    const [userRoles, setUserRoles] = useState({});
    const [prevUserRoles, setPrevUserRoles] = useState({});
    const [originalRows, setOriginalRows] = useState([]);
    const [anchorEl, setAnchorEl] = useState();
    const [statusCode, setStatusCode] = useState();
    const listActions2 = useDrawerActions2();

    const location = useLocation();
    const isLoggedIn = location.state?.isLoggedIn || false;

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    function createData(firstName, lastName, email, roles) {
        return { firstName, lastName, email, roles };
    }

    function createRoleData(roles) {
        return {
            "participant": roles.includes("PARTICIPANT"),
            "author": roles.includes("AUTHOR"),
            "moderator": roles.includes("MODERATOR"),
            "admin": roles.includes("ADMIN")
        };
    }

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        axios.get(ADMIN_DASHBOARD_URL)
        .then(response => {
            console.log("Admin successfully accessed admin dashboard!", response);
            createRowData(response);
            setStatusCode(response.status);
        })
        .catch(error => {
            console.log("Error occured while accessing admin dashboard.", error);
            setStatusCode(error.response.status);
            if (error.response.status === UNAUTHORISED) {
                navigate("/", { state: { unauthorised: true }});
            }
        })
    },[]);

    const createRowData = (response) => {
        const userRolesObj = {};
        response.data.forEach(data => {
            const roles = createRoleData(data.roles);
            userRolesObj[data.email] = roles;
        });
        const rowsObj = response.data.map(data => createData(data.firstName, data.lastName, data.email, userRolesObj[data.email]));
        
        setRows(rowsObj);
        setOriginalRows(rowsObj);
        setUserRoles(userRolesObj);
    }

    const modalStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const handleEditModalOpen = (row) => {
        setIsEditModalOpen(true);
        setSelectedRow(row);
        setPrevUserRoles(userRoles);
    }
    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedRow();
    }

    const handleFilterSelectOpen = (event) => {
        setAnchorEl(event.currentTarget)
        setIsFilterSelectOpen(true);
    }

    const handleFilterSelectClose = () => {
        setAnchorEl();
        setIsFilterSelectOpen(false);
    }

    const handleRolesToggle = (role, isChecked, user) => {
        setUserRoles(prevUserRoles => ({
            ...prevUserRoles, 
            [user.email]: {
                ...prevUserRoles[user.email],
                [role]:isChecked
            }
        }));
    }

    const updateRows = (newRows) => {
        setRows(newRows);
        setOriginalRows(newRows);
    }

    const handleSave = () => {
        const updatedRows = rows.map(row => ({
            ...row,
            roles: userRoles[row.email] || {} }));
        updateRows(updatedRows);
        console.log("selected email ", selectedRow.email);
        console.log("selected roles ", selectedRow.roles);
        
        const rolesObj = userRoles[selectedRow.email];
        const roles = Object.keys(rolesObj)
                .filter(role => rolesObj[role]===true)
                .map(role => role.toUpperCase());
        console.log("updated ", roles);

        axios.put(ADMIN_CHANGE_ROLES, { email: selectedRow.email, roles })
        .then(response => console.log("Successfully updated roles", response))
        .catch(error => console.error(error));

        handleEditModalClose();
    }

    const handleCancel = () => {
        setUserRoles(prevUserRoles);
        handleEditModalClose();
    }

    const filterByRole = (role) => {
        if (role) {
            setRows(originalRows.filter(row => row.roles[role]));
        } else {
            setRows(originalRows);
        }
    };

    function handleGoToAdminPage() {
        navigate("/admin");
    }

    const dashboard = (
        <Box>
            <Toolbar/>
            <Toolbar>
                <Typography variant="h6" component="div">User Roles</Typography>
                <FormControl sx={{ml: 'auto'}} variant="filled">
                      <Tooltip title="Filter list">
                            <IconButton onClick={handleFilterSelectOpen}>
                                <FilterListIcon/>
                            </IconButton>
                        </Tooltip>
                    <InputLabel id="role-filter-label" sx={{display: 'none'}}/>
                    <Select 
                        labelId="role-filter-label" 
                        id="role-filter"
                        open={isFilterSelectOpen}
                        onClose={handleFilterSelectClose}
                        input={<Input style={{ display: 'none'}}/>}
                        MenuProps={{
                            anchorEl: anchorEl,
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left"
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }}>
                        <MenuItem value="" onClick={() => filterByRole('')}><em>None</em></MenuItem>
                        <MenuItem value={'participant'} onClick={() => filterByRole('participant')}>Participant</MenuItem>
                        <MenuItem value={'author'} onClick={() => filterByRole('author')}>Author</MenuItem>
                        <MenuItem value={'moderator'} onClick={() => filterByRole('moderator')}>Moderator</MenuItem>
                        <MenuItem value={'admin'} onClick={() => filterByRole('admin')}>Admin</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Roles</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                        <TableRow
                        key={row.firstName}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.firstName}</TableCell>
                            <TableCell>{row.lastName}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="right">
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                        {Object.keys(row.roles).filter(role => row.roles[role]).map((role, index) => (
                                            <div key={index} style={{display: 'flex'}}>{role}</div>
                                        ))}
                                    </Box>
                                    <Button variant="contained" onClick={() => handleEditModalOpen(row)}>Edit</Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isEditModalOpen && (
                <Modal
                    open={isEditModalOpen}
                    onClose={handleEditModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">Edit roles for {selectedRow.firstName} {selectedRow.lastName}</Typography>
                        <br/>
                        <FormGroup>
                            <FormControlLabel control={<Switch checked={userRoles[selectedRow.email]?.participant || false} 
                                onChange={(e) => handleRolesToggle('participant', e.target.checked, selectedRow)} />} label="Participant" />
                            <FormControlLabel control={<Switch checked={userRoles[selectedRow.email]?.author || false} 
                                onChange={(e) => handleRolesToggle('author', e.target.checked, selectedRow)} />} label="Author" />
                            <FormControlLabel control={<Switch checked={userRoles[selectedRow.email]?.moderator || false} 
                                onChange={(e) => handleRolesToggle('moderator', e.target.checked, selectedRow)} />} label="Moderator" />
                            <FormControlLabel control={<Switch checked={userRoles[selectedRow.email]?.admin || false} 
                                onChange={(e) => handleRolesToggle('admin', e.target.checked, selectedRow)} />} label="Admin" />
                        </FormGroup>
                        <br/>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'flex-end' }}>
                            <Button variant="contained" onClick={handleCancel}>Cancel</Button>
                            <Button variant="contained" onClick={handleSave}>Save</Button>
                        </Box>
                    </Box>
                </Modal>
            )}
            {isLoggedIn && <SnackbarComponent message="Admin logged in successfully!" severity="success" />}

        </Box>
    );
    
    return (
        <div>
            {statusCode === OK && 
            <ResponsiveDrawer
                listItems1={ADMIN_DRAWER_ITEMS_1}
                listActions1={[handleGoToAdminPage]}
                listItems2={DRAWER_ITEMS_2}
                listActions2={listActions2}
                mainBox={dashboard}
            />}
        </div>
    )
}