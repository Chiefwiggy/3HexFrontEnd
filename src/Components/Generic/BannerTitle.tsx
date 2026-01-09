import React from 'react';
import {Box, Divider, IconButton, Typography} from "@mui/material";
import {getConditionBorderColor} from "../../Utils/CardColorUtils";
import {FaCode} from "react-icons/fa6";
import HighlightType from "./HighlightType";
import {TextUtils} from "../../Utils/TextUtils";

interface IBannerTitleInput {
    idTag: string,
    title: string,
    subtitle?: string,
    bannerColor: string,
    children?: React.ReactNode,

}

const BannerTitle = ({
    idTag,
    title,
    bannerColor,
    subtitle="",
    children
}: IBannerTitleInput) => {
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
                <Box>
                    <Typography variant="h4" component="span">{title}</Typography>
                    <Typography variant="h6" fontSize="16px" component="span" sx={{paddingLeft: "4px"}}> {subtitle}</Typography>
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

export default BannerTitle