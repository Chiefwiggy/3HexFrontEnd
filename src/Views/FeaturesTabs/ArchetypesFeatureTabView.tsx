import React, {useEffect, useState} from 'react';
import {Box, Divider, IconButton, Tab, Tabs, Typography} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import IconButtonWithTooltip from "../../Components/Generic/IconButtonWithTooltip";
import {TbHexagonNumber1, TbHexagonNumber2, TbHexagonNumber3, TbHexagonNumber4} from "react-icons/tb";
import {IClassMetaData} from "../../Data/IClassMetaData";
import ClassSelectorPanel from "../../Components/Sheet/ClassSelectorPanel";
import {StringAction} from "../../Utils/StringReducer";

interface IArchetypesFeatureTabViewInput {
    myClasses: Array<string>,
    classDispatch: React.Dispatch<StringAction> | null,
    isCompendium?: boolean
}

const ArchetypesFeatureTabView = ({myClasses, classDispatch, isCompendium=false}: IArchetypesFeatureTabViewInput) => {

    const {ClassData, isLoaded} = usePreloadedContent()

    const [displayTier, setDisplayTier] = useState(1);

    const [currentClasses, setCurrentClasses] = useState<Array<IClassMetaData>>([]);

    const invokeDispatch = (index: number) => (action: "add" | "remove", isPromotion: boolean) => {
        if (classDispatch) {
            const elem = currentClasses[index].className;
            if (isPromotion) {
                classDispatch({type: action, str: `${elem}_promoted`})
            } else {
                classDispatch({type: action, str: elem})
                if (action == "remove") {
                    classDispatch({type: action, str: `${elem}_promoted`})
                }
            }
        }
    }

    const handleTierChange = (tier: 1 | 2 | 3 | 4) => () => {
        setDisplayTier(tier);
        setCurrentClasses(ClassData.getClassesData(tier));
        setTabIndex(0)
    }

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    useEffect(() => {
        handleTierChange(1)();
    }, [])
    useEffect(() => {
        handleTierChange(1)();
    }, [isLoaded])


    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 9fr"
            }}
        >
            <Box
            >
                <Typography variant={"h6"} >CLASS TIER</Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "left"
                        }}
                    >
                        <IconButtonWithTooltip title={"Beginner"} placement={"left"} onClick={handleTierChange(1)}>
                            <TbHexagonNumber1 color={displayTier != 1 ? "#0d3e14": "#0fdd14"}/>
                        </IconButtonWithTooltip>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "left"
                        }}
                    >
                        <IconButtonWithTooltip title={"Intermediate"} placement={"right"} onClick={handleTierChange(2)}>
                            <TbHexagonNumber2 color={displayTier != 2 ? "#1e4467": "#0d7ff3"}/>
                        </IconButtonWithTooltip>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "left"
                        }}
                    >
                        <IconButtonWithTooltip title={"Advanced"} placement={"left"} onClick={handleTierChange(3)}>
                            <TbHexagonNumber3 color={displayTier != 3 ? "#3c1b59": "#9310ea"}   />
                        </IconButtonWithTooltip>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "left"
                        }}
                    >
                        <IconButtonWithTooltip title={"Expert"} placement={"right"} onClick={handleTierChange(4)} variant={"scrollable"}>
                            <TbHexagonNumber4 color={displayTier != 4 ? "#614c0d": "#ffdd00"}/>
                        </IconButtonWithTooltip>
                    </Box>

                </Box>
                <Divider sx={{width: "80%", p: 0.5, mb: 1}} />
                <Box
                    sx={{
                        height: "calc(100dvh - 280px)",
                        overflowY: "auto",
                        scrollbarColor: '#6b6b6b #2b2b2b',
                        scrollbarWidth: 'thin',
                        direction: "rtl"
                    }}
                >
                    <Tabs onChange={handleTabChange} value={tabIndex} orientation={"vertical"} sx={{direction: "ltr"}}>
                        {
                            currentClasses.map((clz, index) => {
                                return (
                                    <Tab label={clz.className} value={index} sx={{backgroundColor: myClasses.includes(currentClasses[index].className) ? "rgba(18,52,86,0.44)" : "#44444400"}} key={index}/>
                                )
                            })
                        }
                    </Tabs>
                </Box>

            </Box>
            {
                currentClasses.length > tabIndex ?
                    <Box>
                        <ClassSelectorPanel hasClass={myClasses.includes(currentClasses[tabIndex].className)} hasPromotion={myClasses.includes(`${currentClasses[tabIndex].className}_promoted`)} classMetadata={currentClasses[tabIndex]} isCompendium={isCompendium} callback={invokeDispatch(tabIndex)} />
                    </Box>
                    :
                    <></>
            }

        </Box>
    )
}

export default ArchetypesFeatureTabView