import React from 'react';
import {Box, Paper, Typography} from "@mui/material";
import {IPackageData} from "../../Data/ChipsetData";
import {getHackShorthand, UHackType} from "../../Utils/Shorthand";
import ChannelType from "../../Utils/ChannelType";
import {IHackProtocolCardData} from "../../Data/ICardData";
import HackCardPreviewList from "./HackCardPreviewList";

interface IPackageWidgetInput {
    packageData: IPackageData
}

const PackageWidget = ({packageData}: IPackageWidgetInput) => {
    return (
        <Paper
            elevation={1}
            sx={{
                padding: "12px"
            }}
        >
            <Typography variant="h5" component="div">{packageData.packageName}</Typography>
            <Typography>Slots Used: {packageData.memorySlots}</Typography>
            <HackCardPreviewList hackList={packageData.builtinHacks} />
        </Paper>
    )
}

export default PackageWidget