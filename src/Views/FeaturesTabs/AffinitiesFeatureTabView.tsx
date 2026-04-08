import React, {useEffect, useState} from 'react';
import {Box, capitalize, Divider, Tab, Tabs, Typography} from "@mui/material";
import {IAffinities, IAffinitiesAndPath, IPathKeys} from "../../Data/ICharacterData";
import BannerTitle from "../../Components/Generic/BannerTitle";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {AffinityAction} from "../../Utils/AffinityReducer";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import AffinitySelectorPanel from "../../Components/Sheet/AffinitySelectorPanel";

interface IAffinitiesFeatureTabViewInput {
    affData: IAffinitiesAndPath,
    affinityDispatch: React.Dispatch<AffinityAction>,
    featuresAreReady: boolean
}

const AffinitiesFeatureTabView = ({affData, affinityDispatch, featuresAreReady}: IAffinitiesFeatureTabViewInput) => {

    const {currentSheet} = useCharacter()

    const [tabIndex, setTabIndex] = useState(0);

    const [currentAffinityOrPath, setCurrentAffinityOrPath] = useState<keyof IAffinities | keyof IPathKeys>("warrior")
    const [currentAffinityOrPathValue, setCurrentAffinityOrPathValue] = useState<number>(0);
    const [isPath, setIsPath] = useState(true);

    const invokeDispatch = (newValue: number) => {
        affinityDispatch({type: "setOne", affinity: currentAffinityOrPath as keyof IAffinities, value: newValue})
        setCurrentAffinityOrPathValue(newValue)
    }

    useEffect(() => {
        if (featuresAreReady) {
            setCurrentAffinityOrPathValue(affData.path.warrior)
        }
    }, [featuresAreReady])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        setInnerTabIndex(0)
        setCurrentAffinityOrPath(Object.keys(affData.path)[newValue] as  keyof IPathKeys)
        setCurrentAffinityOrPathValue(Object.values(affData.path)[newValue])
        setIsPath(true)
    };

    const [innerTabIndex, setInnerTabIndex] = useState(0);

    const handleInnerTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setInnerTabIndex(newValue);
        if (newValue == 0){
            setCurrentAffinityOrPath(Object.keys(affData.path)[tabIndex] as  keyof IPathKeys)
            setCurrentAffinityOrPathValue(Object.values(affData.path)[tabIndex])
            setIsPath(true)
        } else {
            setCurrentAffinityOrPath(Object.keys(affData.affinities)[tabIndex*3+(newValue-1)] as keyof IAffinities)
            setCurrentAffinityOrPathValue(Object.values(affData.affinities)[tabIndex*3+(newValue-1)])
            setIsPath(false)
        }
    }



    return currentSheet ? (
        <Box
            sx={{
                display: "grid",
                gridGap: "10px",
                gridTemplateColumns: "1fr 9fr",
                height: "calc(100vh - 140px)",
                overflow: "hidden"
            }}
        >
            <Box>
                <Typography variant={"h6"} textAlign={"center"}>PATHS</Typography>
                <Box
                    sx={{
                        overflowY: "auto",
                        scrollbarColor: '#6b6b6b #2b2b2b',
                        scrollbarWidth: 'thin',
                        direction: "rtl"
                    }}
                >
                    <Tabs onChange={handleTabChange} value={tabIndex} orientation={"vertical"}
                     sx={{direction: "ltr"}}>
                        {
                            Object.keys(affData.path).map((path, index) => {
                                const val = Object.values(affData.path)[index]
                                return <Tab label={capitalize(path)} value={index} key={index} sx={{
                                     backgroundColor:  val > 0 ? `rgba(18,52,86,${0.2 + 0.04*val})` : "#00000000"
                                }}/>
                            })
                        }

                    </Tabs>

                </Box>
                <Divider sx={{
                    my: 2
                }}/>
                <Box>
                    <Typography variant={"h6"} textAlign={"center"}>AFFINITIES</Typography>
                    <Box>
                        <Tabs onChange={handleInnerTabChange} value={innerTabIndex} orientation={"vertical"}
                              sx={{direction: "ltr"}}>
                            <Tab label={`${capitalize(Object.keys(affData.path)[tabIndex])}`} value={0}
                                sx={{
                                    fontSize: "1.1rem",
                                    pt: 2
                                }}
                            />
                            {
                                Object.keys(affData.affinities).slice(tabIndex*3,tabIndex*3+3).map((path, index) => {
                                    const val = Object.values(affData.affinities)[tabIndex*3+index]
                                    return <Tab label={capitalize(path)} value={index+1} key={index+1} sx={{
                                        backgroundColor:  val > 0 ? `rgba(18,52,86,${0.2 + 0.08*val})` : "#12345600",
                                    }}/>
                                })
                            }

                        </Tabs>

                    </Box>
                </Box>
            </Box>
            <Box>
                <AffinitySelectorPanel affinityOrPathId={currentAffinityOrPath} affValue={currentAffinityOrPathValue} callback={invokeDispatch} isPath={isPath}/>
            </Box>
        </Box>
    ) : <></>
}

export default AffinitiesFeatureTabView