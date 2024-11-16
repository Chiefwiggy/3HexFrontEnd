import React, {useState} from 'react';
import {Box, Typography} from "@mui/material";
import MinionTemplateSheet from "../../Data/MinionTemplateSheet";
import AttributeBar from "../Sheet/AttributeBar";
import MinionAttributeBars from './MinionAttributeBars';
import MinionDefenses from "./MinionDefenses";

interface IMinionStatPanelInput {
    minionSheet: MinionTemplateSheet | undefined,
    manualPing?: boolean
}

const MinionStatPanel = ({
    minionSheet,
    manualPing = false
}: IMinionStatPanelInput) => {




    return minionSheet ? (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box>
                <Typography variant={"h4"} textAlign={"center"}>{minionSheet.data.minionTemplateName ? minionSheet.data.minionTemplateName : "[UNNAMED]"}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around"
                }}
            >
                <MinionAttributeBars minionData={minionSheet} manualPing={manualPing}/>
                <MinionDefenses minionData={minionSheet} />
            </Box>

        </Box>
    ) : <></>
}

export default MinionStatPanel