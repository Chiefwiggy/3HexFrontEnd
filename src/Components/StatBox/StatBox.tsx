import React, {useEffect, useState} from 'react'
import {Box, capitalize, Card, CardContent, CardHeader, IconButton, Popover, Typography} from "@mui/material";
import {IModifiable} from "../../Data/GenericData";
import {StatChain} from "../../Utils/GetFinalSpellData";
import {getSkillFormat} from "../../Utils/Shorthand";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import {
    AddCircleOutline,
    AddCircleOutlined,
    AddOutlined,
    RemoveCircleOutlined,
    RemoveOutlined
} from "@mui/icons-material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import AddSubtractPanel from '../Generic/AddSubtractPanel';

interface IStatBoxInput {
    stat: string,
    value: IModifiable,
    editMode: boolean,
    handleStatChange: (amount: number, stat: string) => () => void
}
const StatBox = ({
    stat,
    value,
    editMode,
    handleStatChange
}: IStatBoxInput) => {

    const {currentSheet, charPing} = useCharacter();

    const [statValue, setStatValue] = useState<number>(0);
    const [statRelativeColor, setStatRelativeColor] = useState("white")

    const [statCap, setStatCap] = useState(currentSheet?.getStatCap ?? 75);

    const [isPopped, setIsPopped] = useState(false);
    const [popAnchor, setPopAnchor] = useState<HTMLDivElement | null>(null);

    const [currentValue, setCurrentValue] = useState(0);


    useEffect(() => {
        setCurrentValue(value.value);
    }, [value]);

    useEffect(() => {
        if (currentSheet) {
            setStatCap(currentSheet.getStatCap());
        }
    }, [charPing]);

    const handlePop = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!editMode) {
            setPopAnchor(event.currentTarget);
            setIsPopped(true);
        }
    }

    const handleEditStat = (amount: number) => (event: React.MouseEvent) => {
        setCurrentValue(currentValue => currentValue + amount);
    }

    const handlePushEdits = () => {
        handleStatChange(currentValue, stat.toLowerCase())();
    }

    const handleClosePop = () => {
        setPopAnchor(null);
        setIsPopped(false);
    }

    useEffect(() => {
        const modded = StatChain(value.value, [value.modifiers]);
        setStatValue(modded);
        if (value.value > modded) {
            setStatRelativeColor("red");
        } else if (value.value < modded) {
            setStatRelativeColor("green");
        } else {
            setStatRelativeColor("white");
        }
    }, [value.value, value.modifiers?.modifier, value.modifiers?.override, value.modifiers?.multiplier]);

    return (
        <Box>
            <Box
                onClick={handlePop}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    padding: 0.5,
                }}
            >
                <Typography variant={"h6"}>{capitalize(stat)}</Typography>
                {
                    editMode ?
                        <AddSubtractPanel
                            handleChange={handleEditStat}
                            callAfterChange={handlePushEdits}
                            value={currentValue}
                            textVariant={"h6"}
                            isAtBottom={currentValue < 1}
                            isAtCap={currentValue >= statCap}
                            textWidth={30}
                        />
                        :
                        <Typography variant={"h6"} color={statRelativeColor}>{statValue}</Typography>
                }

            </Box>
            <Popover
                open={isPopped}
                anchorEl={popAnchor}
                onClose={handleClosePop}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
            >
                <Box
                    sx={{
                        padding: '24px',
                        textAlign: "center"
                    }}
                >
                    <Typography>Base {capitalize(stat)} [ {value.value} ]  </Typography>
                    <Typography>{capitalize(stat)} Save [ {getSkillFormat(statValue*2)} ]</Typography>
                </Box>
            </Popover>
        </Box>
    )
}

export default StatBox