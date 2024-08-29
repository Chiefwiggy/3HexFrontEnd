import React, {useEffect, useState} from 'react'
import {Box, Button, IconButton, Typography} from "@mui/material";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import StatBox from "../Components/StatBox/StatBox";
import {ModeEditOutlined} from "@mui/icons-material";
import {UStat} from "../Utils/Shorthand";
import {ICharacterStats} from "../Data/ICharacterData";
import characterSheet from "../Data/CharacterSheet";
import useAPI from "../Hooks/useAPI/useAPI";
import CharacterSheet from "../Data/CharacterSheet";

interface IStatViewInput {
    pivot: boolean
}
const StatView = ({
    pivot
}: IStatViewInput) => {

    const {currentSheet , isInEditMode, cancelPing, isReady} = useCharacter();

    const [statData, setStatData] = useState<ICharacterStats|null>(null);
    const [statDiff, setStatDiffPv] = useState<number>(0);

    const setStatDiff = () => {
        if (currentSheet && statData) {
            setStatDiffPv(currentSheet.getTotalStatPoints() - Object.values(statData).reduce((a, b) => a + b.value, 0));
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
    }, [cancelPing, currentSheet?.data.characterLevel]);


    return currentSheet ? (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "9fr 1fr"
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
                    <Typography>Dash: {currentSheet.getDashSpeed()}</Typography>
                    <Typography>Step: {currentSheet.getStepSpeed()}</Typography>
                    <Typography>Stamina Refresh: {currentSheet.getStaminaRefresh()}</Typography>
                    <Typography>Tether Refresh: {currentSheet.getTetherRefresh()}</Typography>
                </Box>
            </Box>

            {
                statDiff > 0 ?
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Typography variant={"body2"} color={"green"}>(You have {statDiff} unspent Attribute Points)</Typography>
                    </Box>
                    : statDiff < 0 ?
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <Typography variant={"body2"} color={"red"}>(You are {-statDiff} Attribute Points over for your level.)</Typography>
                        <br />
                    </Box>
                    :<></>
            }

        </Box>
    ) : <></>
}

export default StatView