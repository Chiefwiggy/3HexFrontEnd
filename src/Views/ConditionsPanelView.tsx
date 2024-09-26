import React from 'react';
import {Box} from "@mui/material";

interface IConditionsPanelViewInput {
    closeSelf: (event: React.MouseEvent) => void;
}

const ConditionsPanelView = ({
    closeSelf
                             }: IConditionsPanelViewInput) => {


    return (
        <Box
            sx={{
                width: "90vw",
                backgroundColor: "#121212",
                height: "100vh"
            }}
        >
            COND
        </Box>
    )
}

export default ConditionsPanelView