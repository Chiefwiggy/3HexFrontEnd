import React from 'react';
import {Box} from "@mui/material";

interface IConditionsPanelViewInput {
    closeSelf: (event: React.MouseEvent) => void;
}

const ConditionsPanelView = ({
    closeSelf
                             }: IConditionsPanelViewInput) => {


    return (
        <Box>
            COND
        </Box>
    )
}

export default ConditionsPanelView