import React from 'react';
import {Box} from "@mui/material";
import {IPackageData} from "../../Data/ChipsetData";

interface IPackageDetailedViewInput {
    packageData: IPackageData
}

const PackageDetailedView = ({packageData}: IPackageDetailedViewInput) => {
    return (
        <Box>
            {packageData.packageName}
        </Box>
    )
}

export default PackageDetailedView