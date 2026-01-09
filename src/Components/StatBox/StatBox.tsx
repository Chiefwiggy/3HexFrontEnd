import React, {useEffect, useState} from 'react'
import {
    Box,
    capitalize,
    Card,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    List, ListItem, ListItemIcon,
    ListItemText,
    Popover,
    Typography
} from "@mui/material";
import {IModifiable} from "../../Data/GenericData";
import {StatChain} from "../../Utils/GetFinalSpellData";
import {getSkillFormat, UStat} from "../../Utils/Shorthand";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import {
    AddCircleOutline,
    AddCircleOutlined,
    AddOutlined, ExpandLess, ExpandMore,
    RemoveCircleOutlined,
    RemoveOutlined
} from "@mui/icons-material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import AddSubtractPanel from '../Generic/AddSubtractPanel';
import {getStatDescription} from "../../Utils/StatDetailsUtil";
import NumberSpinner from "../../Utils/NumberSpinner";

interface IStatBoxInput {
    stat: string,
    value: IModifiable,
    editMode: boolean,
    currentLevel: number,
    handleStatChange: (amount: number, stat: string) => () => void
}
const StatBox = ({
    stat,
    value,
    editMode,
    currentLevel,
    handleStatChange
}: IStatBoxInput) => {

    const {currentSheet, charPing} = useCharacter();

    const [open, setOpen] = useState(currentSheet?.data.settings.showAttributeDescriptions ?? false);
    const description = getStatDescription(stat as UStat);

    const [currentValue, setCurrentValue] = useState(0);
    const [statCap, setStatCap] = useState(0)


    useEffect(() => {
        setCurrentValue(value.value);
    }, [value]);

    useEffect(() => {
        if (currentSheet) {
            console.log(currentLevel)
            setStatCap(Math.floor(currentLevel * 0.2) + 10)
        }
    }, [currentLevel, charPing]);



    const handleChange = (value: number | null) => {
        if (value !== null) {
            setCurrentValue(value);
            handleStatChange(value, stat.toLowerCase())();
        }
    };



    return currentSheet ? (
        <Box>
            <Box
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
                        <>
                            <NumberSpinner
                                size={"small"}
                                min={0}
                                max={statCap}
                                value={currentValue}
                                onValueChange={handleChange}
                            />

                            <Typography variant={"body1"} color={"grey"}>[{getSkillFormat(currentSheet.getSave(stat as UStat))}]</Typography>
                            <Box>
                              <Box display="flex" alignItems="center" onClick={() => setOpen(!open)} sx={{ cursor: 'pointer' }}>
                                <Typography variant="body2" flexGrow={1} textAlign={"right"} paddingRight={"14px"} color={"grey"}>
                                  What is {capitalize(stat)}?
                                </Typography>
                                <IconButton size="small">
                                  {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                                </IconButton>
                              </Box>

                              <Collapse in={open}>
                                <Box>
                                  <Typography variant="body2">{description[0]}</Typography>
                                  <List dense>
                                    {description.slice(1).map((point, index) => (
                                      <ListItem key={index} sx={{ py: 0.25, alignItems: 'flex-start' }}>
                                        <ListItemIcon sx={{ minWidth: '1.2em', mt: '2px' }}>
                                          <Typography variant="body2" component="span">
                                            •
                                          </Typography>
                                        </ListItemIcon>
                                        <ListItemText
                                          primary={
                                            <Typography variant="body2" component="span">
                                              {point}
                                            </Typography>
                                          }
                                          sx={{ margin: 0 }}
                                        />
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                              </Collapse>
                            </Box>


                        </>
                        :
                        <>
                            <Typography variant={"h6"}>{currentValue}</Typography>
                            <Typography variant={"body1"} color={"grey"}>[{getSkillFormat(currentSheet.getSave(stat as UStat))}]</Typography>
                        </>
                }

            </Box>
        </Box>
    ) : <></>
}

export default StatBox