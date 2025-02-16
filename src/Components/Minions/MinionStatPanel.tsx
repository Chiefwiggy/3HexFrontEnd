import React, {useEffect, useState} from 'react';
import {Box, capitalize, Tab, Tabs, Typography} from "@mui/material";
import MinionTemplateSheet from "../../Data/MinionTemplateSheet";
import AttributeBar from "../Sheet/AttributeBar";
import MinionAttributeBars from './MinionAttributeBars';
import MinionDefenses from "./MinionDefenses";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {Calculate} from "@mui/icons-material";
import CalculatedCard from "../CardBuilder/CalculatedCard";
import MinionWeaponCardWrapper from '../CardBuilder/MinionWeaponCardWrapper';
import WeaponCardCalculator from "../../Data/Card Calculators/WeaponCardCalculator";
import MinionTemplateWeaponCardWrapper from './MinionTemplateWeaponCardWrapper';

interface IMinionStatPanelInput {
    minionSheet: MinionTemplateSheet | undefined,
    manualPing?: boolean
}

const MinionStatPanel = ({
    minionSheet,
    manualPing = false
}: IMinionStatPanelInput) => {


    const [currentTab, setCurrentTab] = useState(0);

    const {DowntimeData, isLoaded} = usePreloadedContent();

    const handleTabChange = (event: React.SyntheticEvent, value: number) => {
        setCurrentTab(value);
    }


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
            <Box>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant={"fullWidth"}
                >
                    <Tab value={0} label={`Ally - [${0}]`} />
                    <Tab value={1} label={`Follower - [${minionSheet.data.baseAuthorityRequirement}]`} />
                    <Tab value={2} label={`Adjutant - [${Math.floor(minionSheet.data.baseAuthorityRequirement * 1.5 + 3)}]`}  />
                    <Tab value={3} label={`Lieutenant - [${Math.floor(minionSheet.data.baseAuthorityRequirement * 2 + 7)}]`} />
                </Tabs>
            </Box>
            {
                isLoaded ?
                    <Box>
                {
                    currentTab == 0 ?
                        <Box>
                            <Typography>{capitalize(minionSheet.data.primarySkill)} +1 : 0</Typography>
                            {
                                minionSheet.data.currentWeapon ?
                                <MinionTemplateWeaponCardWrapper weaponData={minionSheet.GetSimpleWeapon()} minionData={minionSheet} />
                                : <></>
                            }
                        </Box>
                        :
                        <></>
                }
                {
                    currentTab == 1 ?
                        <Box>
                            <Typography>{capitalize(minionSheet.data.primarySkill)} +2 : 0</Typography>
                            <Typography>{capitalize(minionSheet.data.secondarySkill)} +1 : 0</Typography>
                            <Typography>{DowntimeData.GetDowntimeNameById(minionSheet.data.downtimeSkill)} +1 Die</Typography>
                            {
                                minionSheet.data.currentWeapon ?
                                <MinionTemplateWeaponCardWrapper weaponData={minionSheet.data.currentWeapon} minionData={minionSheet} />
                                : <></>
                            }
                        </Box>
                        :
                        <></>
                }
                {
                    currentTab == 2 ?
                        <Box>
                            <Typography>{capitalize(minionSheet.data.primarySkill)} +3 : 0</Typography>
                            <Typography>{capitalize(minionSheet.data.secondarySkill)} +2 : 0</Typography>
                            <Typography>{capitalize(minionSheet.data.tertiarySkill)} +1 : 0</Typography>
                            <Typography>{DowntimeData.GetDowntimeNameById(minionSheet.data.downtimeSkill)} +1 Die</Typography>
                            {
                                minionSheet.data.currentWeapon ?
                                <MinionTemplateWeaponCardWrapper weaponData={minionSheet.data.currentWeapon} minionData={minionSheet} />
                                : <></>
                            }
                        </Box>
                        :
                        <></>
                }
                {
                    currentTab == 3 ?
                        <Box>
                            <Typography>{capitalize(minionSheet.data.primarySkill)} +4 : 0</Typography>
                            <Typography>{capitalize(minionSheet.data.secondarySkill)} +2 : 5</Typography>
                            <Typography>{capitalize(minionSheet.data.tertiarySkill)} +1 : 5</Typography>
                            <Typography>{DowntimeData.GetDowntimeNameById(minionSheet.data.downtimeSkill)} +2 Dice</Typography>
                            {
                                minionSheet.data.currentWeapon ?
                                <MinionTemplateWeaponCardWrapper weaponData={minionSheet.data.currentWeapon} minionData={minionSheet} />
                                : <></>
                            }
                        </Box>
                        :
                        <></>
                }
            </Box>
                    :
                    <></>
            }


        </Box>
    ) : <></>
}

export default MinionStatPanel