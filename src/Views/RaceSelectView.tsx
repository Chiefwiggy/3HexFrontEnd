import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Autocomplete, Box, TextField, Typography, Divider, Chip} from "@mui/material";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import {IRaceMetadata, ISubraceMetadata} from "../Hooks/usePreloadedContent/PLC_RaceData";
import TabSaveBar from "../Components/SmallComponents/TabSaveBar";
import useAPI from "../Hooks/useAPI/useAPI";
import AbilityItem from "../Components/Abilities/AbilityItem";
import {disambiguateCard} from "../Utils/DisambiguateCardType";
import UnlockWrapper from '../Components/Unlocks/UnlockWrapper';
import SubtypeDamageIcon from "../Components/SmallComponents/SubtypeDamageIcon";
import {UDamageSubtype, VDamageSubtypes} from "../Data/ICardData";
import {RxValueNone} from "react-icons/rx";


interface IRaceSelectViewInput {}

const RaceSelectView = ({}: IRaceSelectViewInput) => {
    const {currentSheet} = useCharacter();
    const {RaceData, isLoaded} = usePreloadedContent();
    const {CharacterAPI} = useAPI();

    const [currentRace, setCurrentRace] = useState<IRaceMetadata|null>(null);
    const [currentSubrace, setCurrentSubrace] = useState<ISubraceMetadata|null>(null);
    const [currentUnlockList, setCurrentUnlockList] = useState<Array<string>>([]);
    const [customVulnerability, setCustomVulnerability] = useState<UDamageSubtype | null>(null);
    const [hasChanged, setHasChanged] = useState(false);
    const [canSave, setCanSave] = useState(true);

    useEffect(() => {
        loadDataFromCurrentSheet();
    }, [isLoaded, currentSheet]);

    const loadDataFromCurrentSheet = () => {
        if (currentSheet && currentSheet.data.race) {
            const currentRaceData = RaceData.GetRaceDataById(currentSheet.data.race.raceId);
            setCurrentRace(currentRaceData);
            if (currentRaceData && currentSheet.data.race.subraceId) {
                setCurrentSubrace(currentRaceData.availableSubraces.find(e => e.subraceId === currentSheet.data.race?.subraceId) ?? null);
            }
            setCurrentUnlockList(currentSheet.data.race.pointsSpentOn);
            setCustomVulnerability(currentSheet.data.race.customVulnerability);
        }
    }

    const handleRaceAutocomplete = (event: SyntheticEvent<any>, value: IRaceMetadata | null) => {
        setCurrentRace(value);
        setCurrentSubrace(null);
        setCustomVulnerability(null);
        setHasChanged(true);
    }

    const handleSubraceAutocomplete = (event: SyntheticEvent<any>, value: ISubraceMetadata | null) => {
        setCurrentSubrace(value);
        setCustomVulnerability(null);
        setHasChanged(true);
    }

    const handleChooseCustomVulnerability = (dt: UDamageSubtype) => {
        setCustomVulnerability(dt);
        setHasChanged(true);
    }

    const handleSave = async() => {
        if (currentSheet) {
            currentSheet.data.race = {
                raceId: currentRace?.raceId ?? "",
                subraceId: currentSubrace?.subraceId ?? "",
                raceRoles: [],
                pointsSpentOn: currentUnlockList,
                customVulnerability: customVulnerability ?? ""
            }
            await CharacterAPI.UpdateRace(currentSheet.data._id, currentSheet.data.race);
            setHasChanged(false);
            await currentSheet.SaveCharacterSheet();
        }
    }

    useEffect(() => {
        if (currentRace && currentSubrace && customVulnerability) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [currentRace, currentSubrace, customVulnerability]);

    const handleCancel = () => {
        loadDataFromCurrentSheet();
        setHasChanged(false);
    }

    const updateUnlockList = (newUnlockList: Array<string>) => {
        setCurrentUnlockList(newUnlockList);
        setHasChanged(true);
    }



    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true
    }

    const scrollableSx = {
        p: 3,
        borderRadius: 2,
        backgroundColor: "rgba(255,255,255,0.04)",
        maxHeight: 500,
        overflowY: "auto",
        '&::-webkit-scrollbar': { width: '8px' },
        '&::-webkit-scrollbar-track': { background: 'rgba(255,255,255,0.02)', borderRadius: '4px' },
        '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' },
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255,255,255,0.2) rgba(255,255,255,0.02)'
    };

    const availableCustomVulnerabilities: UDamageSubtype[] = currentSubrace
        ? VDamageSubtypes.filter(dt => dt !== "none" && !currentSubrace.innateVulnerabilities?.includes(dt) && !currentSubrace.innateImmunities?.includes(dt))
        : VDamageSubtypes.filter(dt => dt !== "none");

    return currentSheet && isLoaded ? (
        <Box sx={{ width: "95vw", height: "100vh", backgroundColor: "#121212", py: 3, px: 2 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Race and Build</Typography>

            {/* First row: Ancestry selection + innate traits */}
            <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 3}}>
                {/* Ancestry selection */}
                <Box sx={{ p: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.04)" }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Ancestry Selection</Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Autocomplete
                            options={RaceData.raceMetadata}
                            getOptionLabel={(option) => option.raceName}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Race" />}
                            value={currentRace}
                            onChange={handleRaceAutocomplete}
                        />
                        {currentRace && (
                            <Autocomplete
                                options={currentRace.availableSubraces}
                                getOptionLabel={(option) => option.subraceName}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Subrace" />}
                                value={currentSubrace}
                                onChange={handleSubraceAutocomplete}
                            />
                        )}
                        {/* Custom Vulnerability */}
                        {currentRace && currentSubrace && (
                            <Box sx={{ marginTop: "-54px" }}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>Custom Vulnerability:</Typography>
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(6, 1fr)", // 6 per row
                                        gap: 1,
                                        justifyItems: "center"
                                    }}
                                >
                                    {availableCustomVulnerabilities.map(dt => (
                                        <Box
                                            key={dt}
                                            sx={{
                                                cursor: "pointer",
                                                border: customVulnerability === dt ? "2px solid #fff" : "2px solid transparent",
                                                borderRadius: 1,
                                                p: 0.5
                                            }}
                                            onClick={() => handleChooseCustomVulnerability(dt)}
                                        >
                                            <SubtypeDamageIcon damageSubtype={dt} />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Box>



                    <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
                        Unlocks Used: {currentUnlockList.length} / {currentSheet.getRacialAbilityTokens()}
                    </Typography>
                </Box>

                {/* Innate traits */}
                <Box sx={{ p: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.04)", display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant={"h6"}>Vulnerabilities & Resistances</Typography>
                    {currentSubrace ? (
                        <>
                            {/* Filtered resistances: remove custom vulnerability if it matches */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                <Typography variant="subtitle2">Resistances:</Typography>
                                {(currentSubrace.innateResistances?.filter(r => r !== customVulnerability).length ?? 0) > 0
                                    ? currentSubrace.innateResistances
                                        .filter(r => r !== customVulnerability)
                                        .map(dt => <SubtypeDamageIcon key={dt} damageSubtype={dt} />)
                                    : <RxValueNone size={21} />}
                            </Box>

                            {/* Filtered vulnerabilities: remove any that match resistances */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                <Typography variant="subtitle2">Vulnerabilities:</Typography>
                                {([customVulnerability, ...currentSubrace.innateVulnerabilities]
                                    .filter(Boolean)
                                    .filter(dt => !currentSubrace.innateResistances?.includes(dt as UDamageSubtype)).length > 0
                                    ? [customVulnerability, ...currentSubrace.innateVulnerabilities]
                                        .filter(Boolean)
                                        .filter(dt => !currentSubrace.innateResistances?.includes(dt as UDamageSubtype))
                                        .map(dt => <SubtypeDamageIcon key={dt} damageSubtype={dt as UDamageSubtype} />)
                                    : <RxValueNone size={21} />)}
                            </Box>

                            {/* Immunities */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                <Typography variant="subtitle2">Immunities:</Typography>
                                {currentSubrace.innateImmunities?.length > 0
                                    ? currentSubrace.innateImmunities.map(dt => <SubtypeDamageIcon key={dt} damageSubtype={dt} />)
                                    : <RxValueNone size={21} />}
                            </Box>
                        </>
                    ) : (
                        <Typography variant="subtitle2">Please Select a Subrace</Typography>
                    )}
                </Box>

            </Box>

            {/* Second row: Save / Cancel buttons */}
            <Box>
                <TabSaveBar isChanged={hasChanged} submitCancel={handleCancel} submitSave={handleSave} canSave={canSave} />
            </Box>

            {/* Third row: Ability Panels */}
            <Box sx={{ display: "grid", gridTemplateColumns: "3fr 3fr 2fr", gap: 3 }}>
                {/* Race Abilities */}
                <Box sx={scrollableSx}>
                    <Typography variant="h5" textAlign="center" sx={{ mb: 1 }}>{currentRace ? currentRace.raceName : "Race"} Abilities</Typography>
                    {currentRace && (
                        <>
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, mb: 2 }}>
                                {disambiguateCard([...RaceData.GetBaseRaceCards(currentRace.raceId, 1), ...RaceData.GetRaceRoleCards(currentRace.raceId, 1)], compendiumProps, {
                                    wrapper: (el, key) => <UnlockWrapper el={el} _id={key} unlockedByDefault unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                })}
                                {[...RaceData.GetBaseRaceAbilities(currentRace.raceId, 1), ...RaceData.GetRaceRoleAbilities(currentRace.raceId, 1)].map(ability => (
                                    <UnlockWrapper key={ability._id} el={<AbilityItem abilityData={ability} showPrerequisites={false} />} _id={ability._id} unlockedByDefault unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                ))}
                            </Box>

                            <Divider sx={{ my: 1 }}/>

                            <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>Unlock Abilities</Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {disambiguateCard([...RaceData.GetBaseRaceCards(currentRace.raceId, 2), ...RaceData.GetRaceRoleCards(currentRace.raceId, 2)], compendiumProps, {
                                    wrapper: (el, key) => <UnlockWrapper el={el} _id={key} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                })}
                                {[...RaceData.GetBaseRaceAbilities(currentRace.raceId, 2), ...RaceData.GetRaceRoleAbilities(currentRace.raceId, 2)].map(ability => (
                                    <UnlockWrapper key={ability._id} el={<AbilityItem abilityData={ability} showPrerequisites={false} />} _id={ability._id} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                ))}
                            </Box>
                        </>
                    )}
                </Box>

                {/* Subrace Abilities */}
                <Box sx={scrollableSx}>
                    <Typography variant="h5" textAlign="center" sx={{ mb: 1 }}>{currentSubrace ? currentSubrace.subraceName : "Subrace"} Abilities</Typography>
                    {(currentSubrace && currentRace) && (
                        <>
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2, mb: 2 }}>
                                {disambiguateCard([...RaceData.GetSubraceCards(currentSubrace.subraceId, 1), ...RaceData.GetSubraceRoleCards(currentRace.raceId, currentSubrace.subraceId, 1)], compendiumProps, {
                                    wrapper: (el, key) => <UnlockWrapper el={el} _id={key} unlockedByDefault unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                })}
                                {[...RaceData.GetSubraceAbilities(currentSubrace.subraceId, 1), ...RaceData.GetSubraceRoleAbilities(currentRace.raceId, currentSubrace.subraceId, 1)].map(ability => (
                                    <UnlockWrapper key={ability._id} el={<AbilityItem abilityData={ability} showPrerequisites={false} />} _id={ability._id} unlockedByDefault unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                ))}
                            </Box>

                            <Divider sx={{ my: 1 }}/>

                            <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>Unlock Abilities</Typography>
                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
                                {disambiguateCard([...RaceData.GetSubraceCards(currentSubrace.subraceId, 2), ...RaceData.GetSubraceRoleCards(currentRace.raceId, currentSubrace.subraceId, 2)], compendiumProps, {
                                    wrapper: (el, key) => <UnlockWrapper el={el} _id={key} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                })}
                                {[...RaceData.GetSubraceAbilities(currentSubrace.subraceId, 2), ...RaceData.GetSubraceRoleAbilities(currentRace.raceId, currentSubrace.subraceId, 2)].map(ability => (
                                    <UnlockWrapper key={ability._id} el={<AbilityItem abilityData={ability} showPrerequisites={false} />} _id={ability._id} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                ))}
                            </Box>
                        </>
                    )}
                </Box>

                {/* Racial Overview */}
                {
                    currentRace ? (
                        <Box sx={scrollableSx}>
                            <Box>
                                <Typography variant={"h5"}>{currentRace!.raceName} Overview</Typography>
                                <Typography component="span" variant={"subtitle2"} sx={{pr: 1}}>
                                    Roles:
                                </Typography>
                                {
                                    currentRace.availableRoles.map((role, id) => {
                                        return (
                                            <Chip id={id.toString()} label={role} size={"small"} />
                                        )
                                    })
                                }
                                <Typography variant={"body2"} sx={{pr: 1}}>
                                    {currentRace.raceDescription}
                                </Typography>
                                {
                                    currentSubrace ? (
                                        <Box>
                                            <Typography variant={"h6"}>{currentSubrace.subraceName} Overview</Typography>
                                            <Typography component="span" variant={"subtitle2"} sx={{pr: 1}}>
                                                Additional Roles:
                                            </Typography>
                                            {
                                                currentSubrace.subraceRoles.map((role, id) => {
                                                    return (
                                                        <Chip id={id.toString()} label={role} size={"small"} />
                                                    )
                                                })
                                            }
                                            <Typography variant={"body2"} sx={{pr: 1}}>
                                                {currentSubrace.subraceDescription}
                                            </Typography>
                                        </Box>
                                    ) :
                                    <></>
                                }


                            </Box>
                        </Box>
                    ) : <></>
                }

            </Box>
        </Box>
    ) : null;
}

export default RaceSelectView;
