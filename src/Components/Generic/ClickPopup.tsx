import React, {useState} from 'react';
import {Box, Popover, PopoverOrigin} from "@mui/material";


interface IClickPopupInput {
    clickElement: React.ReactNode,
    children: React.ReactNode,
    anchorOrigin?: PopoverOrigin,
    transformOrigin?: PopoverOrigin
}
const ClickPopup = ({
    clickElement,
    children,
    anchorOrigin = {
        vertical: 'bottom',
        horizontal: 'center'
    },
    transformOrigin = {
        vertical: 'top',
        horizontal: 'center',
      }
}: IClickPopupInput) => {

    const [isPopped, setIsPopped] = useState(false);
    const [popAnchor, setPopAnchor] = useState<HTMLDivElement|null>(null);

    const handlePop = (event:React.MouseEvent<HTMLDivElement>) => {
        setPopAnchor(event.currentTarget);
        setIsPopped(true);
    }

    const handleClosePop = () => {
        setPopAnchor(null);
        setIsPopped(false);
    }

    return (
        <>
            <Box
                onClick={handlePop}
                sx={{
                    userSelect: "none"
                }}
            >
                {children}
            </Box>
            <Popover
                open={isPopped}
                anchorEl={popAnchor}
                onClose={handleClosePop}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                {clickElement}
            </Popover>
        </>
    )
}

export default ClickPopup;