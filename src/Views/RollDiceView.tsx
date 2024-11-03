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
    "DISADVANTAGE",
    "STANDARD",
    "ADVANTAGE"
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
    const [currentDice, setCurrentDice] = useState<number>(6);
    const [rollResult, setRollResult] = useState(0);
    const { currentSheet, charPing } = useCharacter();
    const { SettingsData } = usePreloadedContent();
    const [currentDieStyle, setCurrentDieStyle] = useState(SettingsData.GetDieSettingsById("DD_STANDARD"));

    const [resultString, setResultString] = useState<string>("");
    const [isCrit, setIsCrit] = useState(false);
    const [combinationBonus, setCombinationBonus] = useState(0);

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
        calculateRollResult(values);
    };

    const rollAll = () => {
        if (dieRef.current) {
            dieRef.current.rollAll();
        }
    };

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
        setCurrentDice((prev) => Math.max(5, Math.min(prev + delta, 7)));
    };

    return currentSheet ? (
        <Box sx={{backgroundColor: "#121212", width: "100vw", padding: "12px" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around"
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
                    isAtCap={currentDice >= 7}
                    isAtBottom={currentDice <= 5}
                    textOverride={rollTypes[currentDice - 5]}
                    textWidth={120}
                />
            </Box>
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
                <Button onClick={rollAll} variant={"contained"}>ROLL</Button>
            </Box>




            {/*<Box sx={{ display: "flex" }}>*/}
            {/*    {["pierce", "slash", "kinetic", "burn", "frost", "shock", "corrosive", "sensory", "holy", "curse", "soul", "none"].map(*/}
            {/*        (damageSubtype) => (*/}
            {/*            <SubtypeDamageIcon key={damageSubtype} damageSubtype={damageSubtype} />*/}
            {/*        )*/}
            {/*    )}*/}
            {/*</Box>*/}
        </Box>
    ) : null;
};

export default RollDiceView;
