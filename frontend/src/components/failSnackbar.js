import { AlertTitle, Snackbar } from "@mui/material";
import React, { useState } from "react";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useFailedSnackbarHelper = (msg)=>{
    const [openFailSnackbar, setFailOpenSnackbar] = useState(false);
    const handleSnackbarClose = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
      
        setFailOpenSnackbar(false);
    }

    const FailedSnackbarHelper = ()=>(
        <Snackbar open={openFailSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="failed" sx={{ width: '100%' }}>
            <AlertTitle>Failed</AlertTitle>
                {msg}
            </Alert>
        </Snackbar>
    )

    return {
        openFailSnackbar,
        setFailOpenSnackbar,
        FailedSnackbarHelper
    }
}

export default useFailedSnackbarHelper;