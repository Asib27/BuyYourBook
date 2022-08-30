import { AlertTitle, Snackbar } from "@mui/material";
import React, { useState } from "react";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useSuccessSnackbarHelper = (msg)=>{
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const handleSnackbarClose = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
      
        setOpenSnackbar(false);
    }

    const SnackbarHelper = ()=>(
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            <AlertTitle>Success</AlertTitle>
                {msg}
            </Alert>
        </Snackbar>
    )

    return {
        openSnackbar,
        setOpenSnackbar,
        SnackbarHelper
    }
}

export default useSuccessSnackbarHelper;