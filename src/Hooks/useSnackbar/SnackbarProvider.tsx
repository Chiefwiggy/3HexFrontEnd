import React, {useState} from 'react';
import {Alert, Box, Snackbar} from "@mui/material";
import SnackbarContext from "./SnackbarContext";

interface ISnackbarProviderInput {

}

const SnackbarProvider = ({children}: any) => {

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "info" | "warning" | "error">("info")

    const SendToSnackbar = (message: string, severity: "success" | "info" | "warning" | "error" = "info") => {
        setSnackbarOpen(true);
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
    }


    return (
        <SnackbarContext.Provider value={{
            SendToSnackbar
        }}>
            {children}
            <Snackbar
                open={snackbarOpen}
                message={snackbarMessage}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={2000}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    sx={{
                        backgroundColor: "#1e1e1e",
                        color: "#fff",
                        boxShadow: 3,
                        "& .MuiAlert-icon": {
                            color: "#fff"
                        }
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}

export default SnackbarProvider