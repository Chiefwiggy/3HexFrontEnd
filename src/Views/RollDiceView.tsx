import React, { useEffect, useRef, useState } from 'react';
import {Box, Button, MenuItem, Paper, Select, SelectChangeEvent, Typography} from "@mui/material";
import ReactDice, { ReactDiceRef } from 'react-dice-complete';
import SubtypeDamageIcon from "../Components/SmallComponents/SubtypeDamageIcon";
import AddSubtractPanel from '../Components/Generic/AddSubtractPanel';
import useCharacter from "../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import { SiRubygems } from "react-icons/si";
import BoxWithTooltip from "../Components/Generic/BoxWithTooltip";

interface IRollDiceViewInput {}

const rollTypes = [
    "DISABLED",
    "1 Dice",
    "2 Dice",
    "3 Dice",
    "4 Dice",
    "DISADVANTAGE",
    "STANDARD",
    "ADVANTAGE",
    "8 Dice",
    "9 Dice"
];

const PAIR_TYPES = [
    "Pair",
    "Set",
    "Quad"
]

const NUMBERS = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen"
]

const RollDiceView: React.FC<IRollDiceViewInput> = () => {
    const dieRef = useRef<ReactDiceRef>(null);
    const expertDieRef = useRef<ReactDiceRef>(null);
    const [currentDice, setCurrentDice] = useState<number>(6);
    const [currentDiceValues, setCurrentDiceValues] = useState<Array<number>>([4,4,4,4,4,4])
    const [rollResult, setRollResult] = useState(0);
    const { currentSheet, charPing } = useCharacter();
    const { SettingsData } = usePreloadedContent();
    const [currentDieStyle, setCurrentDieStyle] = useState(SettingsData.GetDieSettingsById("DD_STANDARD"));

    const [resultString, setResultString] = useState<string>("");
    const [isCrit, setIsCrit] = useState(false);
    const [combinationBonus, setCombinationBonus] = useState(0);

    const [currentDiceExpertise, setCurrentDiceExpertise] = useState<number>(1);

    const [expertPanelEnabled, setExpertPanelEnabled] = useState<boolean>(false);


    useEffect(() => {
        if (currentSheet) {
            setCurrentDieStyle(SettingsData.GetDieSettingsById(currentSheet.data.settings.dieColorId));
        }
    }, [currentSheet, charPing]);

    const handleDieStyleChange = async (event: SelectChangeEvent) => {
        if (currentSheet) {
            await currentSheet.setDieColor(event.target.value);
        }
    };

    const rollDone = (totalValue: number, values: number[]) => {
        setCurrentDiceValues(values);
        calculateRollResult(values);
    };

    const rollDoneExpertise = (totalValue: number, values: number[]) => {
        calculateRollResult([...values, ...currentDiceValues]);
    }

    const rollAll = () => {
        hideExpertPanel()
        if (dieRef.current) {
            dieRef.current.rollAll();
        }
    };

    const hideExpertPanel = () => {
        setExpertPanelEnabled(false)
        setCurrentDiceExpertise(0)
        calculateRollResult(currentDiceValues)
    }

    const rollExpert = () => {
        if (expertDieRef.current) {
            expertDieRef.current.rollAll();
        }
    }

    const calculateRollResult = (values: number[]) => {
        const rollByResult = values.reduce((pv, cv) => {
            pv[cv - 1] += 1;
            return pv;
        }, [0, 0, 0, 0, 0, 0]);

        let totalPts = 0;
        let instances = 0;

        const pairings = rollByResult.reduce((pv, cv) => {
            if (cv >= 2) {
                totalPts += (2 * cv) - 3;
                instances++;
                pv[cv - 2]++;
            }
            return pv;
        }, Array(values.length - 1).fill(0));

        if (instances > 2) {
            totalPts += (instances - 2)*2;
        }
        setCombinationBonus(Math.max(0,(instances - 2) * 2))

        let finalStrs = [];
        let doesCrit = false;
        if (totalPts == 0) {
            finalStrs.push("CRITICAL MISS")
        } else {
            if (pairings.slice(3).reduce((pv, cv) => pv + cv, 0) > 0) {
                doesCrit = true;
            }
            pairings.forEach((value, index) => {
                if (value > 0) {
                    if (PAIR_TYPES[index]) {
                        finalStrs.push(`${NUMBERS[value]} ${PAIR_TYPES[index]} (+${((index*2)+1)*value})`)
                    } else {
                        if (value > 1) {
                            finalStrs.push(`${NUMBERS[index+2]} of a Kind (x${value}) (+${((index*2)+1)*value})`)
                        } else {
                            finalStrs.push(`${NUMBERS[index+2]} of a Kind (+${((index*2)+1)*value})`)
                        }

                    }
                }
            })
        }

        let finalStr = finalStrs.reverse().join(" + ")

        setIsCrit(doesCrit)
        setResultString(finalStr)
        setRollResult(totalPts);
    };

    const handleChangeDice = (delta: number) => () => {
        setCurrentDice((prev) => Math.max(2, Math.min(prev + delta, 9)));
    };

    const handleChangeExpertiseDice = (delta: number) => () => {
        if (currentDiceExpertise + delta == 0) {
            hideExpertPanel()
        } else if (!expertPanelEnabled) {
            setExpertPanelEnabled(true);
            setCurrentDiceExpertise(1)
        } else {
            setCurrentDiceExpertise((prev) => Math.max(0, Math.min(prev + delta, 3)));
        }

    }

    return currentSheet ? (
        <Box sx={{backgroundColor: "#121212", width: "100vw", padding: "12px" }}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 1fr",
                    justifyItems: "center"
                }}
            >
                <Select onChange={handleDieStyleChange} value={currentDieStyle.id}>
                    {SettingsData.GetAllDieColors().map((datum) => (
                        <MenuItem key={datum.id} value={datum.id} disabled={datum.lockedByDefault}>
                            {datum.name}
                            {datum.lockedByDefault && (
                                <Box sx={{ display: "flex", alignItems: "center", paddingLeft: "2px" }}>
                                    <Typography sx={{ paddingRight: "2px" }}>- 300</Typography>
                                    <SiRubygems />
                                </Box>
                            )}
                        </MenuItem>
                    ))}
                </Select>
                <AddSubtractPanel
                    handleChange={handleChangeDice}
                    value={currentDice}
                    isAtCap={currentDice >= 9}
                    isAtBottom={currentDice <= 2}
                    textOverride={rollTypes[currentDice]}
                    textWidth={120}
                />
                <AddSubtractPanel
                    handleChange={handleChangeExpertiseDice}
                    value={currentDiceExpertise}
                    isAtCap={currentDiceExpertise >= 3}
                    isAtBottom={currentDiceExpertise <= 0}
                    textOverride={expertPanelEnabled ? rollTypes[currentDiceExpertise] : "NO EXPERTISE"}
                    textWidth={120}
                />



            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 1fr"
                }}
            >
                <Box></Box>
                <Box sx={{ display: "flex", justifyContent: "center", padding: "12px" }}>
                    <Paper
                        elevation={3}
                    >
                        <ReactDice
                            key={currentDice} // Force re-render on dice count change
                            numDice={currentDice}
                            ref={dieRef}
                            rollDone={rollDone}
                            disableIndividual={true}
                            rollTime={0.3}
                            {...currentDieStyle.colorData}
                        />
                    </Paper>

                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", padding: "12px" }}>
                    <Paper
                        elevation={3}
                    >
                        {
                            expertPanelEnabled ?
                                <ReactDice
                                    key={currentDice}
                                    numDice={currentDiceExpertise}
                                    ref={expertDieRef}
                                    rollDone={rollDoneExpertise}
                                    disableIndividual={true}
                                    rollTime={0.3}
                                    {...currentDieStyle.colorData}
                                />
                                :
                                <></>
                        }

                    </Paper>

                </Box>
            </Box>


            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Typography variant={"h5"} sx={isCrit ? {color: "gold", fontWeight: "bold"} : {}}> +{rollResult}</Typography>
                <Typography variant={"h6"} sx={isCrit ? {color: "gold", fontWeight: "bold"} : {}}> {resultString}</Typography>
                <BoxWithTooltip title={"Combination Bonus: When you have three or more combinations of pairings, gain +2 to the result (for each pairing above 2)"} placement={"right"}>
                    <Typography variant={"subtitle2"} sx={{color: "darkgray"}}> Combination Bonus +{combinationBonus}</Typography>
                </BoxWithTooltip>

                <br />
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr 1fr",
                        width: "100%",
                        justifyItems: "center"

                    }}
                >
                    <Box></Box>
                    <Button onClick={rollAll} variant={"contained"}>ROLL</Button>
                    <Button onClick={rollExpert} variant={"contained"}>ROLL EXPERT</Button>
                </Box>

            </Box>




            {/*<Box sx={{ display: "flex" }}>*/}
            {/*    {["pierce", "slash", "impact", "burn", "frost", "shock", "corrosive", "sensory", "holy", "curse", "soul", "none"].map(*/}
            {/*        (damageSubtype) => (*/}
            {/*            <SubtypeDamageIcon key={damageSubtype} damageSubtype={damageSubtype} />*/}
            {/*        )*/}
            {/*    )}*/}
            {/*</Box>*/}
        </Box>
    ) : null;
};

export default RollDiceView;
