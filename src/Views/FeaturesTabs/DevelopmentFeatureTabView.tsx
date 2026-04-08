import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IAbility} from "../../Data/IAbilities";
import {ICommonCardData} from "../../Data/ICardData";
import { LevelKey } from "../../Hooks/usePreloadedContent/PLC_DevelopmentData";
import {disambiguateCard} from "../../Utils/DisambiguateCardType";

interface IDevelopmentFeatureTabViewInput {

}

const DevelopmentFeatureTabView = ({}: IDevelopmentFeatureTabViewInput) => {

    const {DevelopmentData, isLoaded} = usePreloadedContent()

    const [allDevelopmentFeatures, setDevelopmentFeatures] = useState<Record<LevelKey, Array<ICommonCardData|IAbility>>>()

    useEffect(() => {
        setDevelopmentFeatures(DevelopmentData.GetDevelopmentFeaturesByLevel())
    }, [isLoaded])

    const compendiumPropsTemplate = {
        isExpanded: true,
        canToggleExpand: false,
        canFavorite: false,
        isAdd: true,
        showAdd: true,
        showPrerequisites: false,
    }

    return (allDevelopmentFeatures) ? (
        <Box>
            <Typography>Development Abilities</Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 9fr"
                }}
            >
                <Box>

                </Box>
                <Box>
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
                    {
                        Object.entries(allDevelopmentFeatures).map(([key, elems]) => {
                            const lvl = key.replace("level", "")
                            return (
                                <Box>
                                    <Box>
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
                                                {
                                                    lvl == "0" ?
                                                        <Typography variant="h6" component="span">Background</Typography>
                                                            :
                                                        <Typography variant="h6" component="span">Level {lvl}</Typography>
                                                }
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
                                                disambiguateCard(elems, {...compendiumPropsTemplate})
                                            }
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box>
    ) : <></>
}

export default DevelopmentFeatureTabView