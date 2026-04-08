import React from 'react';
import {Box} from "@mui/material";
import {IFatelineFullData} from "../../Data/IFatelineData";
import FatelinePreviewCard from "./FatelinePreviewCard";

interface IFatelinePreviewViewInput {
    gotoDetailedView: (fatelineId: string) => void
    allFatelineData: Array<IFatelineFullData>
    myFates: Array<string>
}

const FatelinePreviewView = ({gotoDetailedView, allFatelineData, myFates}: IFatelinePreviewViewInput) => {
    return (
        <Box

            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gridGap: "20px"
            }}
        >
            {
                allFatelineData.map(fate => {
                    const uprightFate = myFates.includes(fate.fatelineId)
                    const reverseFate = myFates.includes(fate.fatelineId+"_reversed")
                    return <FatelinePreviewCard key={fate.fatelineId} fatelineData={fate} gotoDetailedView={gotoDetailedView} forceReversed={reverseFate} fateSelected={uprightFate || reverseFate} uprightSelected={uprightFate} />
                })
            }
        </Box>
    )
}

export default FatelinePreviewView