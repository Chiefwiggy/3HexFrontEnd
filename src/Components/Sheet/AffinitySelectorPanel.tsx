import React, {useEffect, useState} from 'react';
import {Box, Button, capitalize, Typography} from "@mui/material";
import {IAffinities, IPathKeys} from "../../Data/ICharacterData";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {ICommonCardData} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";
import {getNameFromClassTier} from "../../Utils/Shorthand";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import DoubleNumberSpinner from "../Generic/DoubleNumberSpinner";
import NumberSpinner from "../Generic/NumberSpinner";
import NumberSpinnerDisplay from "../Generic/NumberSpinnerDisplay";
import {disambiguateCard} from "../../Utils/DisambiguateCardType";
import {GetPathFromAffinity} from "../../Utils/AffinityReducer";

interface IAffinitySelectorPanelInput {
    affinityOrPathId: keyof IAffinities | keyof IPathKeys
    affValue: number,
    callback: (value: number) => void,
    isPath: boolean,
    isCompendium?: boolean
}

const AffinitySelectorPanel = ({affinityOrPathId, affValue, callback, isPath, isCompendium=false}: IAffinitySelectorPanelInput) => {

    const {AffinityData, PathData, isLoaded} = usePreloadedContent()

    const [allCards, setAllCards] = useState<Map<number, Array<ICommonCardData>>>();

    const [allAbilities, setAllAbilities] = useState<Map<number, Array<IAbility>>>();

    const [levelArray, setLevelArray] = useState<Array<number>>([]);

    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true,
        meetsPrerequisites: false
    }

    const [parentPath, setParentPath] = useState("warrior")



    useEffect(() => {
        if (isPath) {
            setAllCards(PathData.getPathCardsByLevel(affinityOrPathId as keyof IPathKeys));
            setAllAbilities(PathData.getPathAbilitiesByLevel(affinityOrPathId as keyof IPathKeys));
            setLevelArray(PathData.getLevelArray(affinityOrPathId as keyof IPathKeys));
            setParentPath("none")
        } else {
            setAllCards(AffinityData.getAffinityCardsByLevel(affinityOrPathId as keyof IAffinities));
            setAllAbilities(AffinityData.getAffinityAbilitiesByLevel(affinityOrPathId as keyof IAffinities));
            setLevelArray(AffinityData.getLevelArray(affinityOrPathId as keyof IAffinities));
            setParentPath(GetPathFromAffinity(affinityOrPathId as keyof IAffinities));
        }
    }, [affinityOrPathId, isLoaded]);

    const handleChangeLevel = (value: number | null) => {
        if (value !== null) {
            callback(value);
        }
    }

    return (
        <Box>
            <Box
                sx={{
                    width: "100%",
                    backgroundColor: "#123456",
                    borderRadius: 1,
                    margin: "8px",
                    ml: 0,
                    padding: "8px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Box>
                    <Typography variant="h4" component="span">{isPath && `Path of the `}{capitalize((affinityOrPathId))}</Typography>
                    <Typography variant="h6" fontSize="16px" component="span" sx={{paddingLeft: "4px"}}> {!isPath && `PATH OF THE ${parentPath.toUpperCase()}`}</Typography>
                </Box>
                {
                    isCompendium ?
                        <></>
                        :
                        <Box
                            sx={{
                                pr: 2,
                                display: "flex",
                                gap: "10px"
                            }}
                        >
                            {
                                isPath ?
                                    <NumberSpinnerDisplay size={"small"} value={affValue}/>
                                    :
                                    <NumberSpinner
                                        size={"small"}
                                        min={0}
                                        max={10}
                                        value={affValue}
                                        onValueChange={handleChangeLevel}
                                    />
                            }

                        </Box>
                }


            </Box>
            <Box
                sx={{
                    overflowY: "auto",
                    height: "80vh"
                }}
            >
                {
                    allCards && allAbilities && levelArray.map(num => {
                        return (
                            <Box key={num}>
                                <Box
                                    sx={{
                                        width: "95%",
                                        backgroundColor: (affValue >= num || isCompendium) ? "#123456" : "rgba(18,52,86,0.2)",
                                        borderRadius: 1,
                                        margin: "4px",
                                        padding: "4px",
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h6" component="span">{capitalize(affinityOrPathId)} {num}</Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: "repeat( auto-fill , max(264px, 18vw))",
                                        gridGap: "10px",
                                        my: 2,
                                    }}
                                >
                                    {
                                        disambiguateCard([...(allCards.get(num) ?? []), ...(allAbilities.get(num) ?? [])], compendiumProps)
                                    }
                                </Box>
                            </Box>
                        )
                    })
                }
            </Box>

        </Box>
    )
}

export default AffinitySelectorPanel