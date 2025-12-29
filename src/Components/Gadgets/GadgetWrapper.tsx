import React from 'react';
import {Box, IconButton, Paper} from "@mui/material";
import {IGadgetData} from "../../Data/IGadgetData";
import {IGadgetDataPlusActive} from "../MainTabs/ChipsetTab";
import GadgetCard from "./GadgetCard";
import {GrTechnology} from "react-icons/gr";

interface IGadgetWrapperInput {
    gadgetDataPA: IGadgetDataPlusActive,
    toggleGadgetActive: () => void
}

const GadgetWrapper = ({gadgetDataPA, toggleGadgetActive}: IGadgetWrapperInput) => {
    return (
        <Paper elevation={1}
            sx={{
                display: "flex"
            }}
        >
            <GadgetCard gadgetData={gadgetDataPA.gadgetData} scaleWithCharacter={true} />
            {
                gadgetDataPA.gadgetData.gadgetActionType == "passive"
                ?
                    <Box
                        sx={{
                            display: "flex"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <IconButton
                                onClick={toggleGadgetActive}
                                color={gadgetDataPA.isGadgetActive ? "primary" : "default"}
                            >
                                <GrTechnology />
                            </IconButton>
                        </Box>

                    </Box>
                    :
                    <></>
            }

        </Paper>
    )
}

export default GadgetWrapper