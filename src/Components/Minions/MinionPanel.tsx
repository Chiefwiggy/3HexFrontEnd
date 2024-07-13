import React from 'react';
import {Box} from "@mui/material";
import {IMinionData} from "../../Data/IMinionData";
import AttributeBar from "../Sheet/AttributeBar";
import MinionAttributeBars from "./MinionAttributeBars";
import MinionSheet from "../../Data/MinionSheet";

interface IMinionPanelInput {
    minionData: MinionSheet
}

const MinionPanel = ({
    minionData
}: IMinionPanelInput) => {


    return minionData ? (
        <Box>
            {minionData.data.minionName}
            <MinionAttributeBars minionData={minionData} />
        </Box>
    ) : <></>
}

export default MinionPanel