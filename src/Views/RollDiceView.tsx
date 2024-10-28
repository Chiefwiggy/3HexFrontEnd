import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, IconButton, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import ReactDice, {ReactDiceRef} from 'react-dice-complete'
import SubtypeDamageIcon from "../Components/SmallComponents/SubtypeDamageIcon";
import {AddCircleOutlined, RemoveCircleOutlined} from "@mui/icons-material";
import AddSubtractPanel from '../Components/Generic/AddSubtractPanel';
import useCharacter from "../Hooks/useCharacter/useCharacter";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import {SiRubygems} from "react-icons/si";

interface IRollDiceViewInput {

}

const rollTypes = [
    "DISADVANTAGE",
    "STANDARD",
    "ADVANTAGE"
]

const RollDiceView = ({}: IRollDiceViewInput) => {

    const reactDice = useRef<ReactDiceRef>(null);

    const [currentDice, setCurrentDice] = useState<number>(6);

    const [rollType, setRollType] = useState<string>("Normal");

    const {currentSheet, charPing} = useCharacter();

    const {SettingsData} = usePreloadedContent();

    const [currentDieStyle, setCurrentDieStyle] = useState(SettingsData.GetDieSettingsById("DD_STANDARD"))

    useEffect(() => {
        if (currentSheet) {
            setCurrentDieStyle(SettingsData.GetDieSettingsById(currentSheet.data.settings.dieColorId));
        }
    }, [charPing]);

    const handleDieStyleChange = async(event: SelectChangeEvent) => {
        if (currentSheet) {
            await currentSheet.setDieColor(event.target.value)
        }
    }



    const rollDone = (totalValue: number, values: number[]) => {
        console.log(totalValue);
        console.log(values);
    }

    const rollAll = () => {
        reactDice.current?.rollAll();
    }

    const handleChangeDice = (delta: number) => (event: React.MouseEvent) => {
        setCurrentDice(currentDice + delta);
    }




    return currentSheet ? (
        <Box
            sx={{
                width: "40vw",
                backgroundColor: "#121212",
                height: "100vh"
            }}
        >
            <Box>
                <Select
                    onChange={handleDieStyleChange}
                    value={currentDieStyle.id}
                >
                    {
                        SettingsData.GetAllDieColors().map((datum) => ((
                            <MenuItem key={datum.id} value={datum.id} disabled={datum.lockedByDefault}>{datum.name}
                                {datum.lockedByDefault ?
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",

                                    }}>
                                        <Typography sx={{paddingLeft: "2px"}}> - 300 </Typography>
                                        <Box
                                            sx={{
                                                paddingTop: "4px"
                                            }}
                                        >
                                            <SiRubygems />
                                        </Box>
                                    </Box>
                                    : ""}
                            </MenuItem>
                        )))
                    }
                </Select>
            </Box>
            <Box>
                <ReactDice
                    numDice={currentDice}
                    ref={reactDice}
                    rollDone={rollDone}
                    disableIndividual={true}
                    rollTime={0.3}
                    {...currentDieStyle.colorData}
                />
            </Box>
            <Button onClick={rollAll}>ROLL</Button>

            <AddSubtractPanel handleChange={handleChangeDice} value={currentDice} valCap={7} valBottom={5} textOverride={rollTypes[currentDice-5]} textWidth={120}/>
            <Box
                sx={{
                    display: "flex"
                }}
            >
                <SubtypeDamageIcon damageSubtype="pierce" />
                <SubtypeDamageIcon damageSubtype="slash" />
                <SubtypeDamageIcon damageSubtype="kinetic" />
                <SubtypeDamageIcon damageSubtype="burn" />
                <SubtypeDamageIcon damageSubtype="frost" />
                <SubtypeDamageIcon damageSubtype="shock" />
                <SubtypeDamageIcon damageSubtype="corrosive" />
                <SubtypeDamageIcon damageSubtype="sensory" />
                <SubtypeDamageIcon damageSubtype="holy" />
                <SubtypeDamageIcon damageSubtype="curse" />
                <SubtypeDamageIcon damageSubtype="soul" />
                <SubtypeDamageIcon damageSubtype="none" />
            </Box>


        </Box>
    ) : <></>
}

export default RollDiceView