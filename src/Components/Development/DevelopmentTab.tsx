import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {disambiguateCard} from "../../Utils/DisambiguateCardType";
import UnlockWrapper from "../Unlocks/UnlockWrapper";
import AbilityItem from "../Abilities/AbilityItem";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import useAPI from "../../Hooks/useAPI/useAPI";
import {IRaceMetadata, ISubraceMetadata} from "../../Hooks/usePreloadedContent/PLC_RaceData";
import {IAbility} from "../../Data/IAbilities";

interface IMasteryTabInput {
    currentUnlockList: Array<string>,
    updateUnlockList: (newUnlockList: Array<string>) => void
}

const DevelopmentTab = ({currentUnlockList, updateUnlockList}: IMasteryTabInput) => {

    const {DevelopmentData, isLoaded} = usePreloadedContent();

    const {currentSheet} = useCharacter()

    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true
    }

    const isAbilityDisabled = (ability: IAbility): boolean => {
        if (currentSheet) {
            if (currentUnlockList.length >= currentSheet.getDevelopmentPoints()) {
                return true
            }
            return ability.prerequisites.reduce((pv, cv) => {
                if (pv) return pv;

                    if (cv.prerequisiteType == "level") {
                        if (currentSheet.getLevel() < cv.level) {
                            return true;
                        }
                    }
                return pv;
            }, false)
        }
        return false
    }


    return currentSheet ? (
        <Box
            sx={{
                width: "80vw"
            }}
        >
            <Box>
                <Typography variant={"h6"}>Current Development Points Used: {currentUnlockList.length} / {currentSheet.getDevelopmentPoints()}</Typography>
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat( auto-fill , max(314px, 19vw))",
                    gridGap: "10px",
                    width: "100%",
                    maxHeight: "88vh",
                    overflowY: "auto",
                    scrollbarColor: "#6b6b6b #2b2b2b",
                    scrollbarWidth: "thin"
                  }}
            >
                {
                    disambiguateCard(DevelopmentData.GetDevelopmentCards(), compendiumProps, {
                        wrapper: (el, key) => <UnlockWrapper el={el} _id={key} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                    })
                }
                {DevelopmentData.GetDevelopmentAbilities().sort((a,b) => {
                    const aLevel = a.prerequisites.find(e => e.prerequisiteType === "level")?.level ?? 0
                    const bLevel = b.prerequisites.find(e => e.prerequisiteType === "level")?.level ?? 0
                    if (aLevel != bLevel) {
                        return aLevel - bLevel
                    } else {
                        return a.abilityName.localeCompare(b.abilityName)
                    }
                }).map(ability => {
                    return <UnlockWrapper key={ability._id} el={<AbilityItem abilityData={ability} showPrerequisites={true} />} _id={ability._id} unlockedByDefault={false} isDisabled={isAbilityDisabled(ability)} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                })}

            </Box>
        </Box>
    ) : <></>
}

export default DevelopmentTab