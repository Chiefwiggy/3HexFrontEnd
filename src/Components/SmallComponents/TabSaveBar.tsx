import React, {useState} from 'react';
import {Alert, Box, Button} from "@mui/material";

interface ITabSaveBarInput {
    submitSave: () => void,
    submitCancel: () => void,
    isChanged: boolean
}

const TabSaveBar = ({
    submitSave,
    submitCancel,
    isChanged
}: ITabSaveBarInput) => {


    const [showStatus, setShowStatus] = useState(false);

    const handleSaveData = () => {
        setShowStatus(true);
        setTimeout(() => {
            setShowStatus(false);
        }, 1000)
        submitSave();
    }

    const handleCancelSaveData = () => {
        submitCancel();
    }

    return (
        <Box
            sx={{
                display: "flex"
            }}
        >
            <Alert severity="success" sx={{
                transition: 'opacity 1s ease-out',
                opacity: showStatus ? 1 : 0
            }}> Success! </Alert>
            <Button onClick={handleSaveData} color={"success"} disabled={!isChanged}> Save </Button>
            <Button onClick={handleCancelSaveData} color={"error"} disabled={!isChanged}> Cancel </Button>
        </Box>
    )
}

export default TabSaveBar