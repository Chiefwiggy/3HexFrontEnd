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
import {FaCircle, FaRegCircle} from "react-icons/fa";
import {clone} from "../../Utils/ObjectUtils";
import {ICommonCardData} from "../../Data/ICardData";

interface IMasteryTabInput {
    currentUnlockList: Array<string>,
    updateUnlockList: (newUnlockList: Array<string>) => void
}

const DevelopmentTab = ({currentUnlockList, updateUnlockList}: IMasteryTabInput) => {

    const {DevelopmentData, isLoaded} = usePreloadedContent();

    const {currentSheet} = useCharacter()

    const [currentLevels, setCurrentLevels] = useState<Array<number>>([])
    const [maskArray, setMaskArray] = useState<Array<boolean>>([])
    const [maxLevel, setMaxLevel] = useState<number>(0)

    useEffect(() => {
        const levelList = currentUnlockList.map(e => DevelopmentData.GetDevelopmentFeatureLevelById(e)).filter((level): level is number => level !== undefined).sort()
        setCurrentLevels(levelList)
        generateMaskArray(levelList)

    }, [currentUnlockList]);

    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true
    }

    const isFeatureDisabled = (ability: IAbility | ICommonCardData): boolean => {
        if (currentSheet) {
            if (currentUnlockList.length >= currentSheet.getDevelopmentPoints()) {
                return true
            }
            return ability.prerequisites.reduce((pv, cv) => {
                if (pv) return pv;

                    if (cv.prerequisiteType == "level") {
                        if (Math.min(maxLevel, currentSheet.getLevel()) < cv.level) {
                            return true;
                        }
                    }
                return pv;
            }, false)
        }
        return false
    }

    const generateCurrentArray = (): Array<number> => {
        if (currentSheet) {
            return [0, ...Array.from({length: currentSheet.getDevelopmentPoints()-1}, (_, i) => 10 + i * 20)]
        }
        return []
    }

    const generateMaskArray = (levels: Array<number>) => {
        const availableArray = clone(generateCurrentArray());


        let truthArray: Array<boolean> = Array(availableArray.length).fill(false);
        let workArray: Array<number> = clone(levels.reverse())
        for (let level of workArray) {
            let foundIt = false;
            for (let i = 0; i < truthArray.length; i++) {
                if (foundIt) {
                    if (!truthArray[i]) {
                        truthArray[i] = true;
                        break;
                    }
                }
                if (availableArray[i] == level) {
                    if (!truthArray[i]) {
                        truthArray[i] = true;
                        break;
                    } else {
                        foundIt = true;
                    }
                }
            }
        }

        setMaskArray(truthArray)
        setMaxLevel(availableArray[truthArray.lastIndexOf(false)])


    }


    return currentSheet ? (
        <Box
            sx={{
                width: "80vw"
            }}
        >
            <Box>
                <Typography variant={"h6"}>Development Point Slots</Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: "10px",
                        padding: "12px"
                    }}
                >


                {
                  generateCurrentArray().map((lvl, index) => {
                    return (
                      <Box
                        key={lvl}
                        sx={{
                          position: "relative",
                          width: 50,
                          height: 50,
                          display: "inline-block"
                        }}
                      >
                        {
                            maskArray[index] ?
                                <FaCircle size={50} color="secondary" />
                                :
                                <FaRegCircle size={50} color="secondary" />
                        }
                        <Typography
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: maskArray[index] ? "black" : "white",
                            fontWeight: "bold"
                          }}
                        >
                          {lvl}
                        </Typography>
                      </Box>
                    );
                  })
                }
                </Box>

            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat( auto-fill , max(314px, 19vw))",
                    gridGap: "10px",
                    width: "100%",
                    maxHeight: "78vh",
                    overflowY: "auto",
                    scrollbarColor: "#6b6b6b #2b2b2b",
                    scrollbarWidth: "thin"
                  }}
            >
                {/*{*/}
                {/*    disambiguateCard(DevelopmentData.GetDevelopmentCards(), compendiumProps, {*/}
                {/*        wrapper: (el, key) => <UnlockWrapper el={el} _id={key} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>*/}
                {/*    })*/}
                {/*}*/}
                {/*{DevelopmentData.GetDevelopmentAbilities().sort((a,b) => {*/}
                {/*    const aLevel = a.prerequisites.find(e => e.prerequisiteType === "level")?.level ?? 0*/}
                {/*    const bLevel = b.prerequisites.find(e => e.prerequisiteType === "level")?.level ?? 0*/}
                {/*    if (aLevel != bLevel) {*/}
                {/*        return aLevel - bLevel*/}
                {/*    } else {*/}
                {/*        return a.abilityName.localeCompare(b.abilityName)*/}
                {/*    }*/}
                {/*}).map(ability => {*/}
                {/*    return <UnlockWrapper key={ability._id} el={<AbilityItem abilityData={ability} showPrerequisites={true} />} _id={ability._id} unlockedByDefault={false} isDisabled={isAbilityDisabled(ability)} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>*/}
                {/*})}*/}
                {[
                    // Cards
                    ...DevelopmentData.GetDevelopmentCards().map(card => ({
                        _id: card._id,
                        level: card.prerequisites?.find(e => e.prerequisiteType === "level")?.level ?? 0,
                        name: card.cardName ?? "",
                        el: disambiguateCard([card], compendiumProps, {
                            wrapper: (el, key) => (
                                <UnlockWrapper
                                    el={el}
                                    _id={card._id}
                                    key={card._id}
                                    unlockedByDefault={false}
                                    isDisabled={isFeatureDisabled(card)}
                                    unlockList={currentUnlockList}
                                    updateUnlockList={updateUnlockList}
                                />
                            )
                        })
                    })),
                    // Abilities
                    ...DevelopmentData.GetDevelopmentAbilities().map(ability => ({
                        _id: ability._id,
                        level: ability.prerequisites?.find(e => e.prerequisiteType === "level")?.level ?? 0,
                        name: ability.abilityName ?? "",
                        el: (
                            <UnlockWrapper
                                key={ability._id}
                                el={<AbilityItem abilityData={ability} showPrerequisites={true} />}
                                _id={ability._id}
                                unlockedByDefault={false}
                                isDisabled={isFeatureDisabled(ability)}
                                unlockList={currentUnlockList}
                                updateUnlockList={updateUnlockList}
                            />
                        )
                    }))
                ]
                .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))
                .map(item => item.el)}

            </Box>
        </Box>
    ) : <></>
}

export default DevelopmentTab