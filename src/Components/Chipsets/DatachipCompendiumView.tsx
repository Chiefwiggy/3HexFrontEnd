import React from 'react';
import {Box} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import useUser from "../../Hooks/useUser/useUser";
import DatachipDetailedView from "./DatachipDetailedView";

interface IDatachipCompendiumViewInput {

}

const DatachipCompendiumView = ({}: IDatachipCompendiumViewInput) => {
    const { DatachipData } = usePreloadedContent();

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
                DatachipData.GetDatachipDataForUser(userPermissions).map(datachip => {
                    return (
                        <Box>
                            <DatachipDetailedView datachipData={datachip} key={datachip._id} />
                        </Box>
                    )
                })
            }
        </Box>
    )
}

export default DatachipCompendiumView