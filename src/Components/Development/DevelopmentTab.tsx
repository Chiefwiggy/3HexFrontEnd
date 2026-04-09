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
import {LevelKey} from "../../Hooks/usePreloadedContent/PLC_DevelopmentData";
import {FeatureIncrementorAction} from "../../Utils/Reducers/FeatureIncrementorReducer";

interface IMasteryTabInput {
    currentUnlockList: Array<string>,
    updateUnlockList: (feature: ICommonCardData | IAbility) => (newUnlockList: Array<string>) => void
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

    const [allDevelopmentFeatures, setDevelopmentFeatures] = useState<Record<LevelKey, Array<ICommonCardData|IAbility>>>()
    const [currentDevelopmentFeatures, setCurrentDevelopmentFeatures] = useState<Array<ICommonCardData|IAbility>>([])

    useEffect(() => {
        setDevelopmentFeatures(DevelopmentData.GetDevelopmentFeaturesByLevel())
    }, [isLoaded])

    useEffect(() => {
        if (allDevelopmentFeatures) {
            setCurrentDevelopmentFeatures(Object.values(allDevelopmentFeatures)
                .flatMap(arr => arr)
                .filter(e => currentUnlockList.includes(e._id)))
        }

    }, [allDevelopmentFeatures]);

    const compendiumPropsTemplate = {
        isExpanded: true,
        canToggleExpand: false,
        canFavorite: false,
        isAdd: false,
        showAdd: true,
        showPrerequisites: false,
    }

    return currentSheet ? (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 19fr",
                height: "calc(100dvh - 188px)"
            }}
        >
            <Box>
                <Typography variant={"h6"}>Slots</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        pr: "12px"
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
                                <FaCircle size={50} color="#234567" />
                                :
                                <FaRegCircle size={50} color="#123456" />
                        }
                        <Typography
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: maskArray[index] ? "white" : "#316eaa",
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
            {
                allDevelopmentFeatures ?
                    <Box
                        sx={{
                            overflowY: "auto",
                            scrollbarColor: '#6b6b6b #2b2b2b',
                            scrollbarWidth: 'thin'
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                backgroundColor: "#12345678",
                                borderRadius: 1,
                                margin: "6px",
                                ml: 0,
                                padding: "8px",
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Box>
                                <Typography variant="h6" component="span">Unlocked</Typography>
                            </Box>
                        </Box>
                        {/*<Box*/}
                        {/*    sx={{*/}
                        {/*        display: 'grid',*/}
                        {/*        gridTemplateColumns: "repeat( auto-fill , max(314px, 19vw))",*/}
                        {/*        gridGap: "10px",*/}
                        {/*        my: 2,*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    {*/}
                        {/*        disambiguateCard(*/}
                        {/*            currentDevelopmentFeatures,*/}
                        {/*            {*/}
                        {/*                isExpanded: true,*/}
                        {/*                canToggleExpand: false,*/}
                        {/*                canFavorite: false,*/}
                        {/*                isAdd: false,*/}
                        {/*                showAdd: false,*/}
                        {/*                showPrerequisites: true*/}
                        {/*            }*/}
                        {/*        ).map((card, index) => {*/}
                        {/*            if (card) {*/}
                        {/*                return <UnlockWrapper el={card} _id={currentUnlockList[index]} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList(currentDevelopmentFeatures[index])} key={index}/>*/}
                        {/*            }*/}
                        {/*        })*/}
                        {/*    }*/}
                        {/*</Box>*/}

                        {
                            Object.entries(allDevelopmentFeatures).map(([key, elems]) => {
                                const lvl = key.replace("level", "")
                                return (
                                    <Box key={key}>
                                        <Box>
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    backgroundColor: currentSheet.getLevel() >= parseInt(lvl) ? "#12345678" : "rgba(86,18,42,0.47)",
                                                    borderRadius: 1,
                                                    margin: "6px",
                                                    ml: 0,
                                                    padding: "8px",
                                                    display: "flex",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                <Box>
                                                    {
                                                        lvl == "0" ?
                                                            <Typography variant="h6" component="span">Background</Typography>
                                                            :
                                                            <Typography variant="h6" component="span">Level {lvl}</Typography>
                                                    }
                                                </Box>
                                                {/*<Box>*/}
                                                {/*    test*/}
                                                {/*</Box>*/}
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: 'grid',
                                                    gridTemplateColumns: "repeat( auto-fill , max(314px, 19vw))",
                                                    gridGap: "10px",
                                                    my: 2,
                                                }}
                                            >
                                                {

                                                    disambiguateCard(elems, {...compendiumPropsTemplate}).map((card, index) => {
                                                        if (card) {
                                                            return <UnlockWrapper el={card} _id={elems[index]._id} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList(elems[index])} key={index} isDisabled={isFeatureDisabled(elems[index])}/>
                                                        }
                                                    })
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })
                        }

                        {/*{[*/}
                        {/*    // Cards*/}
                        {/*    ...DevelopmentData.GetDevelopmentCards().map(card => ({*/}
                        {/*        _id: card._id,*/}
                        {/*        level: card.prerequisites?.find(e => e.prerequisiteType === "level")?.level ?? 0,*/}
                        {/*        name: card.cardName ?? "",*/}
                        {/*        el: disambiguateCard([card], compendiumProps, {*/}
                        {/*            wrapper: (el, key) => (*/}
                        {/*                <UnlockWrapper*/}
                        {/*                    el={el}*/}
                        {/*                    _id={card._id}*/}
                        {/*                    key={card._id}*/}
                        {/*                    unlockedByDefault={false}*/}
                        {/*                    isDisabled={isFeatureDisabled(card)}*/}
                        {/*                    unlockList={currentUnlockList}*/}
                        {/*                    updateUnlockList={updateUnlockList}*/}
                        {/*                />*/}
                        {/*            )*/}
                        {/*        })*/}
                        {/*    })),*/}
                        {/*    // Abilities*/}
                        {/*    ...DevelopmentData.GetDevelopmentAbilities().map(ability => ({*/}
                        {/*        _id: ability._id,*/}
                        {/*        level: ability.prerequisites?.find(e => e.prerequisiteType === "level")?.level ?? 0,*/}
                        {/*        name: ability.abilityName ?? "",*/}
                        {/*        el: (*/}
                        {/*            <UnlockWrapper*/}
                        {/*                key={ability._id}*/}
                        {/*                el={<AbilityItem abilityData={ability} showPrerequisites={true} />}*/}
                        {/*                _id={ability._id}*/}
                        {/*                unlockedByDefault={false}*/}
                        {/*                isDisabled={isFeatureDisabled(ability)}*/}
                        {/*                unlockList={currentUnlockList}*/}
                        {/*                updateUnlockList={updateUnlockList}*/}
                        {/*            />*/}
                        {/*        )*/}
                        {/*    }))*/}
                        {/*]*/}
                        {/*.sort((a, b) => a.level - b.level || a.name.localeCompare(b.name))*/}
                        {/*.map(item => item.el)}*/}

                    </Box>
                    : <></>
            }
        </Box>
    ) : <></>
}

export default DevelopmentTab