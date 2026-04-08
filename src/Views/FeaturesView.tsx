import React, {Reducer, useEffect, useReducer, useState} from 'react';
import {Box, Paper, Tab, Tabs, Typography} from "@mui/material";
import ClassSelectPanel from "../Components/ClassSelect/ClassSelectPanel";
import AffinitiesPanel from "../Components/ClassSelect/Affinities/AffinitiesPanel";
import CustomTabPanel from "../Utils/CustomTabPanel";
import AffinitiesFeatureTabView from "./FeaturesTabs/AffinitiesFeatureTabView";
import ArchetypesFeatureTabView from "./FeaturesTabs/ArchetypesFeatureTabView";
import DevelopmentFeatureTabView from "./FeaturesTabs/DevelopmentFeatureTabView";
import FatelinesFeatureTabView from "./FeaturesTabs/FatelinesFeatureTabView";
import OtherFeaturesTabView from "./FeaturesTabs/OtherFeaturesTabView";
import CharacterPreviewView from "./FeaturesTabs/CharacterPreviewView";
import {IAffinitiesAndPath, IClassData_deprecated, IMiscUnlockData} from "../Data/ICharacterData";
import {IFatelineData} from "../Data/IFatelineData";
import {StandardStringReducer, StringAction} from "../Utils/StringReducer";
import {AFFINITY_PATH_CONST, AffinityAction, AffinityReducer} from "../Utils/AffinityReducer";
import RaceFeatureTabView from "./FeaturesTabs/RaceFeatureTabView";
import DevelopmentTab from "../Components/Development/DevelopmentTab";
import {UDamageSubtype} from "../Data/ICardData";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import useSnackbar from "../Hooks/useSnackbar/useSnackbar";
import {MiscUnlockAction, MiscUnlockReducer} from "../Utils/MiscUnlockReducer";

interface IArchetypesAndAffinitiesViewInput {
    closeSelf: (event: React.MouseEvent) => void
}

const FeaturesView = ({closeSelf}: IArchetypesAndAffinitiesViewInput) => {


    const [affData, affinityDispatch] = useReducer<Reducer<IAffinitiesAndPath, AffinityAction>>(AffinityReducer, AFFINITY_PATH_CONST())

    const [myClasses, classDispatch] = useReducer<Reducer<Array<string>, StringAction>>(StandardStringReducer, []);
    const [fatelineUnlocks, setFatelineUnlocks] = useReducer<Reducer<Array<string>, StringAction>>(StandardStringReducer, [])
    const [myFates, fateDispatch] = useReducer<Reducer<Array<string>, StringAction>>(StandardStringReducer, [])
    const [myDev, setMyDev] = useReducer<Reducer<Array<string>, StringAction>>(StandardStringReducer, [])

    const [myRace, setMyRace] = useState<string>("")
    const [mySubrace, setMySubrace] = useState<string>("")
    const [racialPointIds, setRacialPointIds] = useReducer<Reducer<Array<string>, StringAction>>(StandardStringReducer, [])
    const [customVulnerability, setCustomVulnerability] = useState<UDamageSubtype>("slash")

    const [featuresAreReady, setFeaturesAreReady] = useState<boolean>(false)

    const [otherUnlocks, dispatchOtherUnlocks] = useReducer<Reducer<Array<IMiscUnlockData>, MiscUnlockAction>>(MiscUnlockReducer, [])





    const {currentSheet} = useCharacter()
    const {SendToSnackbar} = useSnackbar()



    const [isStateChanged, setIsStateChanged] = useState<boolean>(false)

    const handleCancel = (event: React.MouseEvent) => {
        if (currentSheet) {
            affinityDispatch({type: "setAll", affinities: {affinities: currentSheet.data.affinities, path: currentSheet.currentPath}})
            classDispatch({type: "set", strs: currentSheet.data.classList})
            setMyDev({type: "set", strs: currentSheet.data.developmentIds})
            fateDispatch({type: "set", strs: currentSheet.data.fatelineIds})
            setFatelineUnlocks({type: "set", strs: currentSheet.data.fatelineUnlockIds})
            dispatchOtherUnlocks({type: "set_all", data: currentSheet.data.miscUnlockTags})
            setFeaturesAreReady(true)
            setIsStateChanged(false)
        }
    }

    const handleSave = async (event: React.MouseEvent) => {
        console.log(myClasses)
        console.log(affData)
        if (currentSheet) {
            SendToSnackbar("Saving...", "info")
            currentSheet.data.affinities = affData.affinities
            currentSheet.data.classList = myClasses
            currentSheet.data.developmentIds = myDev
            currentSheet.data.fatelineIds = myFates
            currentSheet.data.fatelineUnlockIds = fatelineUnlocks
            currentSheet.data.miscUnlockTags = otherUnlocks
            await currentSheet.SaveCharacterSheetv2()
            SendToSnackbar("Saved!", "success")
            closeSelf(event)
        }

    }

    useEffect(() => {
        if (currentSheet) {
            affinityDispatch({type: "setAll", affinities: {affinities: currentSheet.data.affinities, path: currentSheet.currentPath}})
            classDispatch({type: "set", strs: currentSheet.data.classList})
            setMyDev({type: "set", strs: currentSheet.data.developmentIds})
            fateDispatch({type: "set", strs: currentSheet.data.fatelineIds})
            setFatelineUnlocks({type: "set", strs: currentSheet.data.fatelineUnlockIds})
            dispatchOtherUnlocks({type: "set_all", data: currentSheet.data.miscUnlockTags})
            setFeaturesAreReady(true)
        }

    }, []);

    useEffect(() => {
        setIsStateChanged(true)
    }, [affData, myClasses, myFates, myDev, myRace, mySubrace, racialPointIds, customVulnerability]);

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleSelectDevelopment = (newDevList: Array<string>) => {
        setMyDev({type: "set", strs: newDevList })
    }

    return (
        <Box
            sx={{
                width: "90vw",
                backgroundColor: "#121212",
                py: 2,
                px: 2,
                display: "grid",
                gridTemplateColumns: "6fr 2fr",
                gridGap: "10px",
                overflow: "hidden"
            }}
        >
            { /* --- Content --- */ }
            <Box>
                <Typography variant={"h4"} textAlign={"center"}>Feature Unlocks</Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 0,
                        ml: 2,
                        width: "100%",
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Tabs onChange={handleTabChange} value={tabIndex}>
                        <Tab label={"Archetypes"} value={0} />
                        <Tab label={"Affinities"} value={1} />
                        <Tab label={"Race"} value={2} />
                        <Tab label={"Development"} value={3} />
                        <Tab label={"Fatelines"} value={4} />
                        <Tab label={"Other Unlocks"} value={5} />
                    </Tabs>
                </Box>
                { /* --- Content Space --- */ }
                <Box
                    sx={{
                        ml: 4,
                        mt: 1,
                        overflowY: "auto",
                        overflowX: "hidden",
                        height: "calc(100vh - 126px)",
                        scrollbarColor: '#6b6b6b #2b2b2b',
                        scrollbarWidth: 'thin',
                    }}
                >
                    <CustomTabPanel index={tabIndex} value={0}>
                        <ArchetypesFeatureTabView myClasses={myClasses} classDispatch={classDispatch} />
                    </CustomTabPanel>
                    <CustomTabPanel index={tabIndex} value={1}>
                        <AffinitiesFeatureTabView affData={affData} affinityDispatch={affinityDispatch} featuresAreReady={featuresAreReady} />
                    </CustomTabPanel>
                    <CustomTabPanel index={tabIndex} value={2}>
                        <RaceFeatureTabView />
                    </CustomTabPanel>
                    <CustomTabPanel index={tabIndex} value={3}>
                        <DevelopmentTab currentUnlockList={myDev} updateUnlockList={handleSelectDevelopment} />
                    </CustomTabPanel>
                    <CustomTabPanel index={tabIndex} value={4}>
                        <FatelinesFeatureTabView myFates={myFates} fatelineUnlocks={fatelineUnlocks} invokeFateUnlocks={setFatelineUnlocks} invokeMyFates={fateDispatch} />
                    </CustomTabPanel>
                    <CustomTabPanel index={tabIndex} value={5}>
                        <OtherFeaturesTabView dispatchMiscUnlocks={dispatchOtherUnlocks} miscUnlocks={otherUnlocks} />
                    </CustomTabPanel>
                </Box>
            </Box>
            { /* --- Character Overview ---*/ }
            <CharacterPreviewView affData={affData} classData={myClasses} invokeCancel={handleCancel} invokeSave={handleSave} isStateChanged={isStateChanged} devData={myDev} fatelines={myFates} fatelineUnlocks={fatelineUnlocks} otherUnlocks={otherUnlocks} />
        </Box>
    )
}

export default FeaturesView