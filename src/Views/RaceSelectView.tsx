import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Autocomplete, Box, capitalize, Divider, TextField, Typography} from "@mui/material";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import {IRaceMetadata, ISubraceMetadata} from "../Hooks/usePreloadedContent/PLC_RaceData";
import TabSaveBar from "../Components/SmallComponents/TabSaveBar";
import useAPI from "../Hooks/useAPI/useAPI";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import AbilityItem from "../Components/Abilities/AbilityItem";
import {disambiguateCard} from "../Utils/DisambiguateCardType";
import {Lock} from "@mui/icons-material";
import UnlockWrapper from '../Components/Unlocks/UnlockWrapper';

interface IRaceSelectViewInput {

}

const RaceSelectView = ({}: IRaceSelectViewInput) => {

    const {currentSheet} = useCharacter();

    const {RaceData, isLoaded} = usePreloadedContent();
    const {CharacterAPI} = useAPI();

    const [currentRace, setCurrentRace] = useState<IRaceMetadata|null>(null);
    const [currentSubrace, setCurrentSubrace] = useState<ISubraceMetadata|null>(null)

    useEffect(() => {
        loadDataFromCurrentSheet()

    }, [isLoaded, currentSheet])

    const loadDataFromCurrentSheet = () => {
        if (currentSheet && currentSheet.data.race) {
            let currentRaceData = RaceData.GetRaceDataById(currentSheet.data.race.raceId)
            setCurrentRace(currentRaceData)
            if (currentRaceData && currentSheet.data.race.subraceId) {
                setCurrentSubrace(currentRaceData.availableSubraces.find(e => e.subraceId == currentSheet.data.race?.subraceId) ?? null)
            }
            setCurrentUnlockList(currentSheet.data.race.pointsSpentOn)
        }
    }

    const handleRaceAutocomplete = (event: SyntheticEvent<any>, value: IRaceMetadata | null) => {
        setCurrentRace(value)
        setCurrentSubrace(null)
        setHasChanged(true)
    }

    const handleSubraceAutocomplete = (event: SyntheticEvent<any>, value: ISubraceMetadata | null) => {
        setCurrentSubrace(value)
        setHasChanged(true)
    }

     const [hasChanged, setHasChanged] = useState(false);

    const handleSave = async() => {
        if (currentSheet) {
            currentSheet.data.race = {
                raceId: currentRace?.raceId ?? "",
                subraceId: currentSubrace?.subraceId ?? "",
                raceRoles: [],
                pointsSpentOn: currentUnlockList,
            }
            await CharacterAPI.UpdateRace(currentSheet.data._id, currentSheet.data.race)
            setHasChanged(false);
            await currentSheet.SaveCharacterSheet()
        }
    }

    const handleCancel = () => {
        if (currentSheet) {
            loadDataFromCurrentSheet()
            setHasChanged(false);
        }
    }

    const [currentUnlockList, setCurrentUnlockList] = useState<Array<string>>([]);

    const updateUnlockList = (newUnlockList: Array<string>) => {
        setCurrentUnlockList(newUnlockList)
        setHasChanged(true)
    }

    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true
    }

    return currentSheet && isLoaded ? (
        <Box
            sx={{
                width: "95vw",
                backgroundColor: "#121212",
                height: "100vh"
            }}
        >
            <Box>
                <Typography variant={"h4"}>Race and Build</Typography>
                <TabSaveBar isChanged={hasChanged} submitCancel={handleCancel} submitSave={handleSave}/>
                <Box>
                    <Autocomplete
                        options={RaceData.raceMetadata}
                        getOptionLabel={(option) => option.raceName}
                        sx={{ width: 300}}
                        renderInput={(params) => <TextField {...params} label="Race" />}
                        value={currentRace}
                        onChange={handleRaceAutocomplete}
                    />
                    {currentRace ?
                        <Autocomplete
                            options={currentRace.availableSubraces}
                            getOptionLabel={(option) => option.subraceName}
                            sx={{ width: 300}}
                            renderInput={(params) => <TextField {...params} label="Subrace" />}
                            value={currentSubrace}
                            onChange={handleSubraceAutocomplete}
                        />
                        :
                        <></>
                    }

                </Box>
                <Typography>Unlocks Available: {currentSheet.getRacialAbilityTokens() - (currentUnlockList.length) } / {currentSheet.getRacialAbilityTokens()}</Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr"
                    }}
                >

                    <Box>
                        <Typography textAlign={"center"} variant={"h5"}>{currentRace ? currentRace.raceName : "Race"} Abilities</Typography>
                        <Box>
                            {
                                currentRace ?
                                    <Box>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: "1fr 1fr",
                                                gridGap: "10px",
                                                placeSelf: "center"
                                            }}
                                        >
                                            {
                                                disambiguateCard([...RaceData.GetBaseRaceCards(currentRace.raceId, 1), ...RaceData.GetRaceRoleCards(currentRace.raceId, 1)], compendiumProps, {
                                                    wrapper: (el, key) => <UnlockWrapper el={el} _id={key} unlockedByDefault={true} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                                })
                                            }
                                            {[...RaceData.GetBaseRaceAbilities(currentRace.raceId, 1), ...RaceData.GetRaceRoleAbilities(currentRace.raceId, 1)].map(ability => {
                                                return <UnlockWrapper key={ability._id} el={<AbilityItem abilityData={ability} showPrerequisites={false} />} _id={ability._id} unlockedByDefault={true} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                            })}
                                        </Box>
                                        <Divider sx={{
                                            margin: "12px 30px"
                                        }}/>
                                        <Typography textAlign={"center"} variant={"h6"}>Unlock Abilities</Typography>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: "1fr 1fr",
                                                gridGap: "10px",
                                                placeSelf: "center"
                                            }}
                                        >
                                            {
                                                disambiguateCard([...RaceData.GetBaseRaceCards(currentRace.raceId, 2), ...RaceData.GetRaceRoleCards(currentRace.raceId, 2)], compendiumProps, {
                                                    wrapper: (el, key) => <UnlockWrapper el={el} key={key} _id={key} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                                })
                                            }
                                            {[...RaceData.GetBaseRaceAbilities(currentRace.raceId, 2), ...RaceData.GetRaceRoleAbilities(currentRace.raceId, 2)].map(ability => {
                                                return <UnlockWrapper key={ability._id} el={<AbilityItem abilityData={ability} showPrerequisites={false} />} _id={ability._id} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                            })}
                                        </Box>
                                    </Box>
                                    :
                                    <></>
                            }
                        </Box>
                    </Box>
                    <Box>
                        <Typography textAlign={"center"} variant={"h5"}>{currentSubrace ? currentSubrace.subraceName : "Subrace"} Abilities</Typography>
                        <Box
                            sx={{

                            }}
                        >
                            {
                                currentSubrace ?
                                    <Box>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: "1fr 1fr",
                                                gridGap: "10px",
                                                placeSelf: "center"
                                            }}
                                        >
                                            {
                                                disambiguateCard(RaceData.GetSubraceCards(currentSubrace.subraceId, 1), compendiumProps, {
                                                    wrapper: (el, key) => <UnlockWrapper el={el} _id={key} unlockedByDefault={true} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                                })
                                            }
                                            {RaceData.GetSubraceAbilities(currentSubrace.subraceId, 1).map(ability => {
                                                return <UnlockWrapper key={ability._id} el={<AbilityItem abilityData={ability} showPrerequisites={false} />} _id={ability._id} unlockedByDefault={true} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                            })}
                                        </Box>
                                        <Divider sx={{
                                            margin: "12px 30px"
                                        }}/>
                                        <Typography textAlign={"center"} variant={"h6"}>Unlock Abilities</Typography>
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: "1fr 1fr",
                                                gridGap: "10px",
                                                placeSelf: "center"
                                            }}
                                        >
                                            {
                                                disambiguateCard(RaceData.GetSubraceCards(currentSubrace.subraceId, 2), compendiumProps, {
                                                    wrapper: (el, key) => <UnlockWrapper el={el} _id={key} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                                })
                                            }
                                            {RaceData.GetSubraceAbilities(currentSubrace.subraceId, 2).map(ability => {
                                                return <UnlockWrapper key={ability._id} el={<AbilityItem abilityData={ability} showPrerequisites={false} />} _id={ability._id} unlockedByDefault={false} unlockList={currentUnlockList} updateUnlockList={updateUnlockList}/>
                                            })}
                                        </Box>
                                    </Box>
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

export default RaceSelectView