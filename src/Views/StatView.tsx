import React, {useEffect, useState} from 'react'
import {Box, Button, IconButton, Typography} from "@mui/material";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import StatBox from "../Components/StatBox/StatBox";
import {DirectionsRunOutlined, DirectionsWalkOutlined, ModeEditOutlined, RefreshOutlined} from "@mui/icons-material";
import {UStat} from "../Utils/Shorthand";
import {ICharacterStats} from "../Data/ICharacterData";
import characterSheet from "../Data/CharacterSheet";
import useAPI from "../Hooks/useAPI/useAPI";
import CharacterSheet from "../Data/CharacterSheet";
import ClickPopup from "../Components/Generic/ClickPopup";
import BoxWithTooltip from "../Components/Generic/BoxWithTooltip";

interface IStatViewInput {
    pivot: boolean
}
const StatView = ({
    pivot
}: IStatViewInput) => {

    const {currentSheet , isInEditMode, cancelPing, statPing, isReady} = useCharacter();

    const [statData, setStatData] = useState<ICharacterStats|null>(null);
    const [statsUsed, setStatsUsed] = useState<number>(0);

    const setStatDiff = () => {
        if (currentSheet && statData) {
            setStatsUsed(Object.values(statData).reduce((a, b) => a + b.value, 0))
        }
    }

    const handleEditStat = (amount: number, stat: string) => (event: React.MouseEvent) => {
        if (statData && currentSheet) {
            currentSheet.editStat(amount, stat);
            setStatData(currentSheet.data.characterStats);
            setStatDiff();
        }
    }

    useEffect(() => {
        if (currentSheet) {
            setStatData(JSON.parse(JSON.stringify(currentSheet.data.characterStats)));
            setStatDiff();
        }
    }, [isInEditMode]);

    useEffect(() => {
        if (currentSheet) {
            setStatData(JSON.parse(JSON.stringify(currentSheet.data.characterStats)));
            setStatDiff();
        }
    }, [statPing, currentSheet?.data.characterLevel]);


    return currentSheet ? (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "14fr 1fr"
                }}
            >
                <Box
                    sx={{
                    display: 'grid',
                    gridTemplateColumns: pivot ? "repeat(5, 1fr)" : "repeat(2, 1fr)",
                }}
                >
                    {
                        statData ?
                        Object.entries(statData).map(([name, stats]) => {
                            return <StatBox stat={name} value={stats} key={name} editMode={isInEditMode} handleStatChange={handleEditStat} />
                        })
                            :
                            <></>
                    }
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <BoxWithTooltip
                            placement={"left"}
                            title={"Dash Speed (Action)"}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                            }}
                        >
                            <DirectionsRunOutlined sx={{color: "lightblue"}} />
                            <Typography>{currentSheet.getDashSpeed()}</Typography>
                        </BoxWithTooltip>
                        <BoxWithTooltip
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                            }}
                            title={"Step Speed (Bonus Action)"}
                            placement={"left"}
                        >
                            <DirectionsWalkOutlined sx={{color: "cornsilk"}} />
                            <Typography> {currentSheet.getStepSpeed()}</Typography>
                        </BoxWithTooltip>
                        <BoxWithTooltip
                            title={"Stamina Refresh"}
                            placement={"left"}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                            }}
                        >
                            <RefreshOutlined sx={{color: "#38ea6a"}}/>
                            <Typography> {currentSheet.getStaminaRefresh()}</Typography>
                        </BoxWithTooltip>
                        <BoxWithTooltip
                            placement={"left"}
                            title={"Tether Refresh"}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                            }}
                        >
                            <RefreshOutlined sx={{color: "#ac38ea"}}/>
                            <Typography> {currentSheet.getTetherRefresh()}</Typography>
                        </BoxWithTooltip>




                    </Box>
                </Box>

            </Box>

            {
                isInEditMode ?
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Typography variant={"body2"} color={statsUsed <= currentSheet.getTotalStatPoints() ? "green" : "red"}>Stat Points: {statsUsed}/{currentSheet.getTotalStatPoints()}</Typography>
                    </Box>
                    :
                    <></>
            }

        </Box>
    ) : <></>
}

export default StatView