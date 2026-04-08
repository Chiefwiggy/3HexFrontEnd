import React from 'react';
import {Box, Button, ButtonProps, Typography} from "@mui/material";

interface IBannerTitleWithToggleInput {
    idTag: string,
    title: string,
    subtitle?: string,
    bannerColor: string,
    invokeToggle: () => void,
    toggleValue: boolean,
    buttonTitleTrue: string,
    buttonTitleFalse: string,
    buttonColor?: ButtonProps["color"],
    children?: React.ReactNode,
    disabled?: boolean
}

const BannerTitleWithToggle = ({    idTag,
   title,
   bannerColor,
   subtitle="",
    invokeToggle,
    toggleValue,
    buttonTitleTrue,
    buttonTitleFalse,
    buttonColor="info",
    disabled=false,
   children
}: IBannerTitleWithToggleInput) => {
    return (
        <Box
            id={idTag}
            sx={{
                scrollMarginTop: 96
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: `${bannerColor}`,
                    borderRadius: 1,
                    margin: "8px",
                    padding: "8px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Box>
                        <Typography variant="h4" component="span">{title}</Typography>
                        <Typography variant="h6" fontSize="16px" component="span" sx={{paddingLeft: "4px"}}> {subtitle}</Typography>
                    </Box>
                    <Box>
                        <Button
                            color={buttonColor}
                            variant={toggleValue ? "contained" : "outlined"}
                            onClick={invokeToggle}
                            disabled={disabled}
                        >
                            {toggleValue ? buttonTitleTrue : buttonTitleFalse}
                        </Button>
                    </Box>
                </Box>


            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "12px",
                    gap: "10px"
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default BannerTitleWithToggle