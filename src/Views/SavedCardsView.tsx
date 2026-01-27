import React, {useEffect} from 'react';
import {Box, Typography} from "@mui/material";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import PrebuiltWeaponCardWrapper from "../Components/CardBuilder/PrebuiltWeaponCardWrapper";
import PrebuiltSpellCardWrapper from "../Components/CardBuilder/PrebuiltSpellCardWrapper";
import SaveCardMenuPrebuiltWrapper from "../Components/CardBuilder/SaveCardMenuPrebuiltWrapper";

interface ISavedCardsViewInput {
    closeSelf: (event: React.MouseEvent) => void
}

const SavedCardsView = ({closeSelf}: ISavedCardsViewInput) => {

    const {currentSheet, charPing} = useCharacter();

    useEffect(() => {
        console.log("new life");
    }, [charPing]);


    return currentSheet ? (
        <Box
            sx={{
                width: "90vw",
                backgroundColor: "#121212",
                height: "100vh",
                padding: "12px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    paddingBottom: "12px"
                }}
            >
                <Typography variant={"h4"}> Saved Spells & Weapons </Typography>
            </Box>
            <Box
                sx={{
                    overflowY: "auto",
                    height: "95%",
                    scrollbarColor: '#6b6b6b #2b2b2b',
                    scrollbarWidth: 'thin',
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                        gridGap: "10px"
                    }}
                >
                    {
                        currentSheet.data.createdWeapons.map(cw => (
                            <SaveCardMenuPrebuiltWrapper closeSelf={closeSelf} cardData={cw} cardType={"weapon"} key={cw.weaponBaseData.baseId+cw.weaponCardsIds.flatMap(e => e)+Math.random().toString()}/>

                        ))
                    }
                    {
                        currentSheet.data.createdSpells.map(cs => (
                            <SaveCardMenuPrebuiltWrapper closeSelf={closeSelf} cardData={cs} cardType={"spell"} key={cs.spellBaseId+cs.spellTargetId+cs.spellSkillsIds.flatMap(e => e)+Math.random().toString()}/>
                        ))
                    }
                    {
                        currentSheet.data.createdHacks.map(cs => (
                            <SaveCardMenuPrebuiltWrapper closeSelf={closeSelf} cardData={cs} cardType={"hack"} key={cs.hackFunctionId+cs.hackIOId+cs.hackProtocolId+cs.hackCardsIds.flatMap(e => e)+Math.random().toString()}/>
                        ))
                    }
                </Box>
            </Box>



        </Box>
    ) : <></>
}

export default SavedCardsView