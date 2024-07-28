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

interface IStatBoxInput {
    stat: string,
    value: IModifiable,
    editMode: boolean,
    handleStatChange: (amount: number, stat: string) => (event: React.MouseEvent) => void
}
const StatBox = ({
    stat,
    value,
    editMode,
    handleStatChange
}: IStatBoxInput) => {

    const [statValue, setStatValue] = useState<number>(0);
    const [statRelativeColor, setStatRelativeColor] = useState("white")

    const [isPopped, setIsPopped] = useState(false);
    const [popAnchor, setPopAnchor] = useState<HTMLDivElement | null>(null);

    const [currentValue, setCurrentValue] = useState(0);
    const {currentSheet} = useCharacter();

    useEffect(() => {
        setCurrentValue(value.value);
    }, [value]);

    const handlePop = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!editMode) {
            setPopAnchor(event.currentTarget);
            setIsPopped(true);
        }
    }

    const handleEditStat = (amount: number) => (event: React.MouseEvent) => {
        handleStatChange(amount, stat.toLowerCase())(event);
        setCurrentValue(currentValue + amount);
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

    return currentSheet ? (
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

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: "center",
                                gap: 2
                            }}
                        >
                            <IconButton
                                onClick={handleEditStat(-1)}
                                disabled={currentValue < 1}
                            >
                                <RemoveCircleOutlined />
                            </IconButton>
                            <Typography variant={"h6"} color={statRelativeColor}>{statValue}</Typography>
                            <IconButton
                                onClick={handleEditStat(1)}
                                disabled={currentValue >= currentSheet?.getStatCap()}
                            >
                                <AddCircleOutlined />
                            </IconButton>
                        </Box>
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
                    <Typography>{capitalize(stat)} Save [ {getSkillFormat(statValue)} ]</Typography>
                </Box>
            </Popover>
        </Box>
    ) : <></>
}

export default StatBox