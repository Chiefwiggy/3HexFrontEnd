import React, {useEffect, useState} from 'react';
import {Box, Button, capitalize, Divider, Paper, Typography} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import StatView from "../StatView";
import AttributeCardSmall from "../../Components/Sheet/AttributeCardSmall";
import AffinityCardSmall from "../../Components/Sheet/AffinityCardSmall";
import {IAffinitiesAndPath, IMiscUnlockData} from "../../Data/ICharacterData";
import {getClassesString_new, getClassesStringHelper, getNameFromClassTier} from "../../Utils/Shorthand";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IClassServerOutput} from "../../Data/IClassMetaData";
import FatelineIcon from "../../Components/Fatelines/FatelineIcon";
import FatelineEmblem from "../../Components/Fatelines/FatelineEmblem";
import {IFeatureIncrementor} from "../../Utils/Reducers/FeatureIncrementorReducer";

interface ICharacterPreviewViewInput {
    affData: IAffinitiesAndPath;
    classData: Array<string>,
    devData: Array<string>,
    fatelines: Array<string>,
    fatelineUnlocks: Array<string>,
    otherUnlocks: Array<IMiscUnlockData>
    invokeSave: (event: React.MouseEvent) => void,
    invokeCancel: (event: React.MouseEvent) => void
    isStateChanged: boolean,
    featureIncrementors: IFeatureIncrementor
}

const CharacterPreviewView = ({affData, classData, devData, fatelines, fatelineUnlocks, otherUnlocks, invokeSave, invokeCancel, isStateChanged, featureIncrementors}: ICharacterPreviewViewInput) => {

    const [maxAffPts, setMaxAffPts] = useState<number>(0);
    const [currentAffPts, setCurrentAffPts] = useState<number>(0);
    const {currentSheet} = useCharacter();
    const {ClassData} = usePreloadedContent()
    const [sortedClassData, setSortedClassData] = useState<Record<keyof IClassServerOutput, string[]>>();
    const [playerLevel, setPlayerLevel] = useState<number>(0);

    const [maxFatelineAbilities, setMaxFatelineAbilities] = useState<number>(0);
    const [maxWeaponSpecializations, setMaxWeaponSpecializations] = useState<number>(0);
    const [maxFavoredTerrain, setMaxFavoredTerrain] = useState<number>(0);



    useEffect(() => {
        if (currentSheet) {
            setMaxAffPts(currentSheet.getMaxAffinityPoints(classData, false) + featureIncrementors.affinity);
            setCurrentAffPts(Object.values(affData.path).reduce((sum, value) => sum + value, 0))
            setPlayerLevel(currentSheet.getLevel());
            let fatelineUnlocks = 1 + featureIncrementors.fateline_abilities
            let weaponUnlocks = featureIncrementors.weapon_specialization;
            let favoredTerrainUnlocks = featureIncrementors.favored_terrain;
            setMaxFatelineAbilities(fatelineUnlocks);
            setMaxWeaponSpecializations(weaponUnlocks)
            setMaxFavoredTerrain(favoredTerrainUnlocks)
        }
    }, [affData, currentSheet!.data.characterLevel, classData, featureIncrementors]);

    const setIncrementorUnlocks = () => {

    }

    useEffect(() => {
        setSortedClassData(ClassData.getAllClassNamesByTierFiltered(classData))
    }, [classData]);


    return currentSheet ? (
        <Paper
            elevation={1}
            sx={{
                mx: 1,
                display: "flex",
                alignItems: "center",
                py: 2,
                flexDirection: "column",
                width: "100%",
                overflowY: "auto",
                scrollbarColor: '#6b6b6b #2b2b2b',
                scrollbarWidth: 'thin',
                height: "calc(100vh - 30px)"
            }}
        >
            <Typography variant={"h5"}>Character Preview </Typography>
            <Box>
                <Button onClick={invokeCancel} color={"error"} disabled={!isStateChanged}>Cancel</Button>
                <Button onClick={invokeSave} color={"success"} disabled={!isStateChanged}>Save</Button>
            </Box>
            <Divider sx={{width: "90%", p: 0.5, mb: 1}} />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 4fr 1fr",
                    width: "99%"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        mr: "4px"
                    }}
                >
                    {
                        fatelines.length > 0
                            ?
                            <FatelineEmblem fatelineId={fatelines[0]} size={60} />
                            :
                            <FatelineEmblem fatelineId={"automaton"} size={60} />
                    }
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Typography variant={"h6"}>{currentSheet.data.characterName.toUpperCase()}</Typography>
                    <Typography variant={"subtitle2"} sx={{ color: "grey", mt: -1}}>LEVEL {playerLevel}</Typography>
                    <Typography variant="subtitle2" sx={{color: "grey", mt: -0.5, mb: 1}}>
                        {
                            getClassesString_new(ClassData, classData).toUpperCase()
                        }
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        mr: "4px"
                    }}
                >
                    {
                        fatelines.length > 1
                            ?
                            <FatelineEmblem fatelineId={fatelines[1]} size={60} />
                            :
                            <FatelineEmblem fatelineId={"automaton"} size={60} overrideSelected={true} />
                    }
                </Box>

            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    width: "90%",
                    gridGap: 1
                }}
            >
                <AttributeCardSmall stat={"might"} />
                <AttributeCardSmall stat={"agility"} />
                <AttributeCardSmall stat={"skill"} />
                <AttributeCardSmall stat={"awareness"} />
                <AttributeCardSmall stat={"vitality"} />
                <AttributeCardSmall stat={"knowledge"} />
                <AttributeCardSmall stat={"mind"} />
                <AttributeCardSmall stat={"presence"} />
                <AttributeCardSmall stat={"authority"} />
                <AttributeCardSmall stat={"endurance"} />
            </Box>
            <Divider sx={{width: "90%", p: 0.5, mb: 1}} />
            { /* --- UNLOCKS --- */ }
            <Typography variant={"h6"}> UNLOCKS </Typography>
            <Typography variant={"subtitle2"} color={fatelineUnlocks.length > maxFatelineAbilities ? "red" : "grey"}> FATELINE UNLOCKS: {fatelineUnlocks.length} / {maxFatelineAbilities}</Typography>
            <Typography variant={"subtitle2"} color={currentAffPts > maxAffPts ? "red" : "grey"}> WEAPON SPECIALIZATIONS: {otherUnlocks.find(e => e.categoryId == "weapon_specialization")?.unlockIds.length ?? 0} / {maxWeaponSpecializations}</Typography>
            <Typography variant={"subtitle2"} color={currentAffPts > maxAffPts ? "red" : "grey"}> FAVORED TERRAIN: {otherUnlocks.find(e => e.categoryId == "favored_terrain")?.unlockIds.length ?? 0}  / {maxFavoredTerrain}</Typography>
            { /* --- CLASSES --- */ }
            <Typography variant={"h6"}> CLASSES </Typography>
            {
                sortedClassData && Object.values(sortedClassData)
                    .filter((tier, index) => {
                        if (playerLevel < 180 && index == 3) {
                            return false
                        } else if (playerLevel < 120 && index == 2) {
                            return false
                        } else if (playerLevel < 60 && index == 1) {
                            return false
                        }
                        return true
                    })
                    .map((tier, index) => {
                    return (
                        <Box
                            key={index}
                            sx={{
                                display: "grid",
                                width: "90%",
                                gridTemplateColumns: "7fr 3fr"
                            }}
                        >
                            <Box>
                                <Typography>{getClassesStringHelper(tier) || "None"}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row-reverse"
                                }}
                            >

                                <Typography>{capitalize(getNameFromClassTier(index+1))} {tier.length}/{Math.min(4, ((Math.floor(playerLevel / 20) + 2) - index*4))}</Typography>

                            </Box>


                        </Box>
                    )
                })
            }



            <Typography variant={"h6"}> AFFINITIES </Typography>
            <Typography variant={"subtitle2"} color={currentAffPts > maxAffPts ? "red" : "grey"}>AFFINITY POINTS USED: {currentAffPts} / {maxAffPts}</Typography>
            <Box
                sx={{
                    mt: 2,
                    width: "90%"
                }}
            >
                <AffinityCardSmall path={"warrior"} affinities={["finesse", "infantry", "guardian"]} affData={affData}/>
                <AffinityCardSmall path={"arcanist"} affinities={["evocation", "creation", "alteration"]} affData={affData}/>
                <AffinityCardSmall path={"general"} affinities={["command", "supply", "mentorship"]} affData={affData}/>
                <AffinityCardSmall path={"navigator"} affinities={["swift", "riding", "adaptation"]} affData={affData}/>
                <AffinityCardSmall path={"scholar"} affinities={["rune", "sourcecraft", "research"]} affData={affData}/>
                <AffinityCardSmall path={"summoner"} affinities={["animancy", "conjuration", "orchestration"]} affData={affData} />
                <AffinityCardSmall path={"cipher"} affinities={["proxy", "firewall", "virus"]} affData={affData}/>
                <AffinityCardSmall path={"engineer"} affinities={["transduction", "machinery", "crafting"]} affData={affData} />
            </Box>

        </Paper>
    ) : <></>
}

export default CharacterPreviewView