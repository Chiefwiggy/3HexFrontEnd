import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import {IMinionData} from "../../Data/IMinionData";
import AttributeBar from "../Sheet/AttributeBar";
import MinionAttributeBars from "./MinionAttributeBars";
import MinionSheet from "../../Data/MinionSheet";
import MinionStatBar from './MinionStatBar'
import {BedOutlined, BedtimeOutlined} from "@mui/icons-material";
import CalculatedCard from "../CardBuilder/CalculatedCard";
import MinionWeaponCardWrapper from "../CardBuilder/MinionWeaponCardWrapper";
import PrebuiltSpellCardWrapper from "../CardBuilder/PrebuiltSpellCardWrapper";
import MinionSpellCardWrapper from '../CardBuilder/MinionSpellCardWrapper';
import MinionDefenses from "./MinionDefenses";

interface IMinionPanelInput {
    minionData: MinionSheet
}

const MinionPanel = ({
    minionData
}: IMinionPanelInput) => {

    return minionData ? (
        <Box
            sx={{
                padding: "0 12px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: 1
                    }}
                >
                    <Typography variant={"h4"}>{minionData.data.minionName}</Typography>
                    <Typography variant="body2" sx={{
                        paddingBottom: "4px",
                        textTransform: "uppercase"
                    }}>
                        Level {minionData.getLevel()} • AUT {minionData.data.leadershipRequirement}
                    </Typography>
                </Box>
                {/*<IconButton><BedOutlined /></IconButton>*/}
            </Box>

            <Box>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "3fr 7fr"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minWidth: "262px"
                        }}
                    >
                        {/*<MinionAttributeBars minionData={minionData} />*/}
                        <MinionDefenses minionData={minionData} />
                        <MinionStatBar minionData={minionData}/>
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2
                            }}
                        >
                            {
                                minionData.data.currentWeapon
                                    ?
                                    <MinionWeaponCardWrapper weaponData={minionData.data.currentWeapon} minionData={minionData}/>
                                    :
                                    <></>
                            }
                            {
                                minionData.data.currentSpell
                                    ?
                                    <MinionSpellCardWrapper minionData={minionData} spellData={minionData.data.currentSpell} />
                                    :
                                    <></>
                            }
                        </Box>
                    </Box>


                </Box>
            </Box>


        </Box>
    ) : <></>
}

export default MinionPanel