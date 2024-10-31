import React, {useEffect, useState} from 'react';
import {Box, IconButton, SxProps, Typography, TypographyProps, TypographyVariant} from "@mui/material";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";
interface IAddSubtractPanelInput {
    handleChange: (delta: number) => (event: React.MouseEvent) => void,
    value: number,
    isAtCap: boolean,
    isAtBottom: boolean,
    textWidth: number,
    callAfterChange?: () => void,
    textOverride?: string,
    textSx?: SxProps<any>,
    textVariant?: TypographyVariant,
    msTimeout?: number
}

const AddSubtractPanel = ({
    handleChange,
    value,
    isAtCap,
    isAtBottom,
    textWidth,
    callAfterChange = () => {},
    textOverride = '',
    textSx = {},
    textVariant = "body1",
    msTimeout = 400
}: IAddSubtractPanelInput) => {

    const [isLongPressing, setIsLongPressing] = useState(false);
    const [preLongPressTimeout, setPreLongPressTimeout] = useState<ReturnType<typeof setTimeout>>();
    const [currentLongPressTimeout, setCurrentLongPressTimeout] = useState<ReturnType<typeof setTimeout>>();

    const handleInitialClick = (delta: number) => (event: React.MouseEvent)  => {
        handleChange(delta)(event);
        setPreLongPressTimeout(setTimeout(() => {
            setIsLongPressing(true);
            handleHeldClick(event, delta, 0);
        }, msTimeout))
    }

    const handleHeldClick = (event: React.MouseEvent, delta: number, times: number) => {
        console.log("CORRECT", delta);
        const newEvent = setTimeout(() => {
            if ((delta > 0 && !isAtCap) || (delta < 0 && !isAtBottom))  {
                handleChange(delta)(event);
                handleHeldClick(event, delta, times+1);
            } else {
                handleReleaseLongPress()
            }
        }, Math.max(12,100-(times*3)));
        setCurrentLongPressTimeout(newEvent);

    }

    const handleReleaseLongPress = () => {
        setIsLongPressing(false);
        if (preLongPressTimeout) {
            clearTimeout(preLongPressTimeout);
        }
        if (currentLongPressTimeout) {
            clearTimeout(currentLongPressTimeout);
        }
        callAfterChange();
    }



    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: "center",
                gap: 2
            }}
        >
            <IconButton
                onMouseDown={handleInitialClick(-1)}
                onMouseUp={handleReleaseLongPress}
                onMouseLeave={handleReleaseLongPress}
                disabled={isAtBottom}
            >
                <RemoveCircleOutlined />
            </IconButton>
            <Typography
                variant={textVariant}
                sx={{
                    width: `${textWidth}px`,
                    textAlign: "center",
                    ...textSx
                }}
            >
                {textOverride ? textOverride : value}
            </Typography>
            <IconButton
                onMouseDown={handleInitialClick(1)}
                onMouseUp={handleReleaseLongPress}
                onMouseLeave={handleReleaseLongPress}
                disabled={isAtCap}
            >
                <AddCircleOutlined />
            </IconButton>
        </Box>
    )
}

export default AddSubtractPanel