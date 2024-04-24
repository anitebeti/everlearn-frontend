import { Alert, Box, Snackbar } from "@mui/material"
import { useEffect, useState } from "react";

export const SnackbarComponent = ({ message, severity }) => {
    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });

    const { vertical, horizontal } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    useEffect(() => {
        setState({...state, open: true});
    }, []);
    
    return (
        <Box sx={{ position: 'fixed', bottom: 0, width: '100%' }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={state.open}
                autoHideDuration={5000}
                onClose={handleClose}
                key={vertical + horizontal}
            > 
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                > 
                {message}
                </Alert>
            </Snackbar>
        </Box>
    )
}