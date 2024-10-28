import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";

interface IAddSubtractPanelInput {
    handleChange: (delta: number) => (event: React.MouseEvent) => void,
    value: number,
    valCap: number,
    valBottom: number,
    textWidth: number,
    textOverride?: string,
}

const AddSubtractPanel = ({
    handleChange,
    value,
    valCap,
    valBottom,
    textWidth,
    textOverride = '',
}: IAddSubtractPanelInput) => {


    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: "center",
                gap: 2
            }}
        >
            <IconButton
                onClick={handleChange(-1)}
                disabled={value <= valBottom}
            >
                <RemoveCircleOutlined />
            </IconButton>
            <Typography variant={"body1"}
                sx={{
                    width: `${textWidth}px`,
                    textAlign: "center"
                }}
            >{textOverride ? textOverride : value}</Typography>
            <IconButton
                onClick={handleChange(1)}
                disabled={value >= valCap}
            >
                <AddCircleOutlined />
            </IconButton>
        </Box>
    )
}

export default AddSubtractPanel