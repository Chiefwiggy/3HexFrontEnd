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
import SubtypeDamageIcon from '../Components/SmallComponents/SubtypeDamageIcon';
import {UDamageSubtype} from "../Data/ICardData";
import {RxValueNone} from "react-icons/rx";
import {GiMagicHat, GiMeepleCircle, GiRuneStone, GiStripedSword} from "react-icons/gi";
import {FaMoneyBillWave} from "react-icons/fa6";

interface IStatViewInput {
    pivot: boolean
}
const StatView = ({
    pivot
}: IStatViewInput) => {

    const {currentSheet , isInEditMode, healthPing, statPing, isReady} = useCharacter();

    const [statData, setStatData] = useState<ICharacterStats|null>(null);
    const [statsUsed, setStatsUsed] = useState<number>(0);

    const [resistances, setResistances] = useState<Array<string>>([]);
    const [weaknesses, setWeaknesses] = useState<Array<string>>([]);

    const setStatDiff = () => {
        if (currentSheet && statData) {
            setStatsUsed(Object.values(statData).reduce((a, b) => a + b.value, 0))
        }
    }

    const handleEditStat = (amount: number, stat: string) => () => {
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

    useEffect(() => {
        if (currentSheet) {
            const wkrs = currentSheet.getResistancesAndWeaknesses(true)
            setResistances(wkrs.resistances);
            setWeaknesses(wkrs.weaknesses);
        }
    }, [healthPing])


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
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                            }}
                            title={"Step Speed"}
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
                        <BoxWithTooltip
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                            }}
                            title={"Attacks Per Turn"}
                            placement={"left"}
                        >
                            <Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><GiStripedSword color={"#f1ecff"}/></Box>
                            <Typography> {currentSheet.getMaxAttacks()}</Typography>
                        </BoxWithTooltip>
                        <BoxWithTooltip
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                            }}
                            title={"Max Summons"}
                            placement={"left"}
                        >
                            <Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><GiMagicHat color={"#ffe1f5"}/></Box>
                            <Typography> {currentSheet.getMaxSummons()}</Typography>
                        </BoxWithTooltip>
                        <BoxWithTooltip
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr"
                            }}
                            title={"Max Concurrent Runes"}
                            placement={"left"}
                        >
                            <Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><GiMeepleCircle color={"#f1ecff"}/></Box>
                            <Typography> {currentSheet.getMaxGlyphs()}</Typography>
                        </BoxWithTooltip>

                        <Typography variant={"subtitle2"}>Resistances</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                height: "23px"
                            }}
                        >
                            {
                                resistances.map(res => (
                                    <SubtypeDamageIcon key={res} damageSubtype={res as UDamageSubtype}/>
                                ))
                            }
                            {
                                resistances.length == 0 ?
                                    <RxValueNone size={21} />
                                    : <></>
                            }
                        </Box>
                        <Typography variant={"subtitle2"}>Weaknesses</Typography>
                        <Box
                            sx={{
                                height: "23px",
                                display: "flex"
                            }}
                        >
                            {
                                weaknesses.map(weak => (
                                    <SubtypeDamageIcon key={weak} damageSubtype={weak as UDamageSubtype}/>
                                ))
                            }
                            {
                                weaknesses.length == 0 ?
                                    <RxValueNone size={21} />
                                    : <></>
                            }

                        </Box>





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