import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs, Typography} from "@mui/material";
import PrebuiltSpellCardWrapper from "./PrebuiltSpellCardWrapper";
import PrebuiltWeaponCardWrapper from "./PrebuiltWeaponCardWrapper";
import {ICalculatedHack, ICalculatedSpell, ICalculatedWeapon} from "../../Data/ICharacterData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import CustomTabPanel from "../../Utils/CustomTabPanel";
import {ICommanderCardData} from "../../Data/ICardData";
import CommanderCard from '../Cards/CommanderCard'
import PrebuiltHackCardWrapper from "./PrebuiltHackCardWrapper";

interface IPreparedSpellsPanelInput {

}

const PreparedSpellsPanel = ({}: IPreparedSpellsPanelInput) => {

    const {currentSheet, charPing, isReady} = useCharacter();

    const [currentSpell, setCurrentSpell] = useState<null | ICalculatedSpell>(null);
    const [currentWeapon, setCurrentWeapon] = useState<null | ICalculatedWeapon>(null);
    const [currentHack, setCurrentHack] = useState<null | ICalculatedHack>(null);
    const [currentCommander, setCurrentCommander] = useState<null| ICommanderCardData>(null);
    const [currentOffhandWeapon, setCurrentOffhandWeapon] = useState<null | ICalculatedWeapon>(null);
    const [currentCounter, setCurrentCounter] = useState<null|ICalculatedWeapon>(null);

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    useEffect(() => {
        if (currentSheet) {
            setCurrentSpell(currentSheet.data.currentSpell);
            setCurrentWeapon(currentSheet.data.currentWeapon);
            setCurrentHack(currentSheet.data.currentHack);
            setCurrentCommander(currentSheet.getCumulativeCommanderCard())
            setCurrentCounter(currentSheet.data.counterWeapon);
            setCurrentOffhandWeapon(currentSheet.data.currentOffhandWeapon);
        }
    }, [charPing, isReady]);


    return currentSheet ? (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Tabs onChange={handleTabChange} value={tabIndex}>
                <Tab label={"Weapon"} value={0}/>

                <Tab label={"Spell"} value={1}/>
                <Tab label={"Hack"} value={2} />
                <Tab label={"Commander"} value={3} />

                {
                    currentSheet.canDualWield()
                    ?
                        <Tab label={"Offhand"} value={4} />
                        :
                        null
                }
            </Tabs>
            <br />
                    <CustomTabPanel index={tabIndex} value={0}>
                        {
                        currentWeapon ?
                            <PrebuiltWeaponCardWrapper weaponData={currentWeapon} overrideWidth={28}/>
                            :
                            <Typography>Sorry, no weapon loaded.</Typography>
                        }
                    </CustomTabPanel>
                    <CustomTabPanel index={tabIndex} value={4}>
                        {
                        currentOffhandWeapon ?
                            <PrebuiltWeaponCardWrapper weaponData={currentOffhandWeapon} overrideWidth={28}/>
                            :
                            <Typography>Sorry, no offhand weapon loaded.</Typography>
                        }
                    </CustomTabPanel>
                    <CustomTabPanel index={tabIndex} value={1}>
                        {
                            currentSpell
                            ?
                                <PrebuiltSpellCardWrapper spellData={currentSpell} overrideWidth={28}/>
                                :
                                <Typography>Sorry, no spell loaded.</Typography>
                        }
                    </CustomTabPanel>
                    <CustomTabPanel index={tabIndex} value={2}>
                        {
                            currentHack
                                ?
                                <PrebuiltHackCardWrapper hackData={currentHack} overrideWidth={28}/>
                                :
                                <Typography>Sorry, no hack loaded.</Typography>
                        }
                    </CustomTabPanel>
                    <CustomTabPanel index={tabIndex} value={3}>
                        {
                            currentCommander
                            ?
                                <CommanderCard cardData={currentCommander} sendBack={() => {}} canFavorite={false} canToggleExpand={false} isExpanded={true} />
                                :
                                <Typography>Sorry, no commander cards</Typography>
                        }
                    </CustomTabPanel>
        </Box>
    ) : <></>
}

export default PreparedSpellsPanel