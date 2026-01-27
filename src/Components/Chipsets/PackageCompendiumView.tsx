import React from 'react';
import {Box} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import useUser from "../../Hooks/useUser/useUser";
import PackageDetailedView from "./PackageDetailedView";

interface IPackageCompendiumViewInput {

}

const PackageCompendiumView = ({}: IPackageCompendiumViewInput) => {

    const { PackageData } = usePreloadedContent();
    const {userPermissions} = useUser()

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridGap: "10px"
            }}
        >
            {
                PackageData.GetPackageDataForUser(userPermissions).map(pkg => {
                    return <PackageDetailedView packageData={pkg} key={pkg._id} />
                })
            }
        </Box>
    )
}

export default PackageCompendiumView