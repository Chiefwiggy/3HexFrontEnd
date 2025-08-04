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

    const [open, setOpen] = useState(currentSheet?.data.settings.showAttributeDescriptions ?? false);
    const description = getStatDescription(stat as UStat);

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
                        <>
                            <AddSubtractPanel
                                handleChange={handleEditStat}
                                callAfterChange={handlePushEdits}
                                value={currentValue}
                                textVariant={"h6"}
                                isAtBottom={currentValue < 1}
                                isAtCap={currentValue >= statCap}
                                textWidth={30}
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
                            <Typography variant={"h6"} color={statRelativeColor}>{statValue}</Typography>
                            <Typography variant={"body1"} color={"grey"}>[{getSkillFormat(currentSheet.getSave(stat as UStat))}]</Typography>
                        </>
                }

            </Box>
            {/*<Popover*/}
            {/*    open={isPopped}*/}
            {/*    anchorEl={popAnchor}*/}
            {/*    onClose={handleClosePop}*/}
            {/*    anchorOrigin={{*/}
            {/*        vertical: 'bottom',*/}
            {/*        horizontal: 'center',*/}
            {/*      }}*/}
            {/*      transformOrigin={{*/}
            {/*        vertical: 'top',*/}
            {/*        horizontal: 'center',*/}
            {/*      }}*/}
            {/*>*/}
            {/*    <Box*/}
            {/*        sx={{*/}
            {/*            padding: '24px',*/}
            {/*            textAlign: "center"*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        <Typography>Base {capitalize(stat)} [ {value.value} ]  </Typography>*/}
            {/*        <Typography>{capitalize(stat)} Save [ {getSkillFormat(currentSheet.getSave(stat as UStat))} ]</Typography>*/}
            {/*    </Box>*/}
            {/*</Popover>*/}
        </Box>
    ) : <></>
}

export default StatBox