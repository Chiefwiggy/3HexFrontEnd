import React from 'react';
import {Box} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import MountBaseCard from "../Cards/MountBaseCard";

interface IMountTabInput {

}

const MountTab = ({}: IMountTabInput) => {

    const {MountData, isLoaded} = usePreloadedContent();


    return isLoaded ? (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)"
            }}
        >
            {
                MountData.GetMountData().map(mount => {
                    return <MountBaseCard mountData={mount} key={mount._id}/>
                })
            }
        </Box>
    ) : <></>
}

export default MountTab