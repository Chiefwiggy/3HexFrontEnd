import React, {useState} from 'react';
import {Alert, Box, Button} from "@mui/material";
import {clone} from "../../Utils/ObjectUtils";
import {ISourceData} from "../../Data/ISourceData";

interface IFunctionsTabInput {

}

const ChipsetTab = ({}: IFunctionsTabInput) => {

    const saveData = async() => {

    }

    const cancelSaveData = () => {

    }

    const [justUpdated, setJustUpdated] = useState(true);
    const [showStatus, setShowStatus] = useState(false);

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: "row-reverse",
                }}
            >

                <Button onClick={cancelSaveData} color={"error"} disabled={justUpdated}> Cancel </Button>
                <Button onClick={saveData} color={"success"} disabled={justUpdated}> Save </Button>

                <Alert severity="success" sx={{
                    transition: 'opacity 1s ease-out',
                    opacity: showStatus ? 1 : 0
                }}> Success! </Alert>
            </Box>
            <Box>
                <Box>

                </Box>
            </Box>
        </Box>
    )
}

export default ChipsetTab