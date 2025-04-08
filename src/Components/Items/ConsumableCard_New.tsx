import React, {useEffect, useState} from 'react';
import {Box, capitalize, Collapse, Paper, Switch, Typography} from "@mui/material";
import {IConsumableTemplate} from "../../Data/IConsumable";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {ExpandMoreOutlined, FlipOutlined, LinearScaleOutlined} from "@mui/icons-material";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import DowntimeTooltip from "./DowntimeTooltip";
import {MdOutlineFlip} from "react-icons/md";
import {ExpandMore} from "../../Elements/ExpandMore";
import HighlightType from "../Generic/HighlightType";
import consumableTab_New from "../MainTabs/ConsumableTab_New";
import {getNameFromTier} from "../../Utils/Shorthand";
import {getDowntimeTimeModifier} from "../../Utils/DowntimeUtils";

interface IConsumableCard_NewInput {
    consumableTemplate: IConsumableTemplate,
    defaultScaled: boolean
}

const ConsumableCard_New = ({
    consumableTemplate,
    defaultScaled = false
}: IConsumableCard_NewInput) => {

    const {currentSheet, charPing} = useCharacter();

    const [isScaled, setIsScaled] = useState<boolean>(defaultScaled);
    const [isOpen, setIsOpen] = useState(false);

    const handleExpandClick = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (defaultScaled) {
            setScaled()
        } else {
            setUnscaled()
        }
    }, []);


     const handleSwitch = () => {
        if (isScaled) {
            setUnscaled()
        } else {
            setScaled()
        }
        setIsScaled(!isScaled)
    }

    const [currentText, setCurrentText] = useState<Array<string>>(consumableTemplate.description)

    const setScaled = () => {
        const newTVals: Array<string> = consumableTemplate.xVals.map((ct) => {
            let newT = ct.basePower
            if (currentSheet) {
                if (ct.skillScaling !== "none") {
                    newT += currentSheet.getStat(ct.skillScaling) * ct.potency
                }
                console.log(ct.abilityScaling)
                if (ct.abilityScaling) {
                    if (ct.abilityScaling.modifiers) {
                        ct.abilityScaling.modifiers.forEach(mod => {
                            newT += currentSheet.getAbilityBonuses(mod)
                        })
                    }
                    if (ct.abilityScaling.multipliers) {
                        ct.abilityScaling.multipliers.forEach(mod => {
                            newT *= (currentSheet.getAbilityBonuses(mod) || 1)
                        })
                    }
                    if (ct.abilityScaling.overrides) {
                        ct.abilityScaling.overrides.forEach(mod => {
                            newT = currentSheet.getAbilityBonuses(mod)
                        })
                    }
                }

            }
            return `${Math.floor(newT)}` || ""
        })
        setFromXVals(newTVals, "#c95fff")
    }



    const setUnscaled = () => {
        const newTVals: Array<string> = consumableTemplate.xVals.map(
            (ct) => {
                let newT = `${ct.basePower}`
                if (ct.potency > 0 && ct.skillScaling !== "none") {
                    newT += " + ("
                    if (ct.potency !== 1) {
                        newT += `${ct.potency} * `
                    }
                    newT += `your ${capitalize(ct.skillScaling)})`
                }
                return newT
            }
        )
        setFromXVals(newTVals, "#1ad5d5")
    }

    const setFromXVals = (newTArray: Array<string>, color: string) => {
        const finalDescriptions = consumableTemplate.description.map(desc => {
            return desc.replace(/\[X(\d+)\]/g, (_, index) => {
                const i = parseInt(index, 10);
                return `[[color.${color}.'${newTArray[i]}']]` ?? `[X${i}]`;
            });
        })
        setCurrentText(finalDescriptions)
    }



    return (
        <Paper elevation={1} sx={{
            borderRadius: "12px"
        }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 1
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 5fr 1fr",
                        width: "100%"
                    }}
                >
                    <BoxWithTooltip
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        placement={"top"}
                        title={`Scaling ${isScaled ? "On" : "Off"}`}

                    >
                        <LinearScaleOutlined />
                        <Switch size={"small"} checked={isScaled} onChange={handleSwitch} disabled={!currentSheet} />
                    </BoxWithTooltip>
                    <Box>
                        <Typography variant={"h5"} textAlign={"center"}>{consumableTemplate.itemName}</Typography>
                        <Typography variant={"subtitle1"} textAlign={"center"} color={"lightgray"} fontSize={"14px"}> {getNameFromTier(consumableTemplate.itemTier).toUpperCase()} {consumableTemplate.craftingType.toUpperCase()} ({consumableTemplate.itemType.toUpperCase()})</Typography>
                        <Typography variant={"body2"} color={"grey"} textAlign={"center"}>
                            <BoxWithTooltip title={"Retail Price"} placement={"bottom"} component={"span"}>${consumableTemplate.itemCost}</BoxWithTooltip>
                             {' '}/{' '}
                            <BoxWithTooltip title={"Material Cost"} placement={"bottom"} component={"span"}>${consumableTemplate.materialCost}</BoxWithTooltip>
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px"
                        }}
                    >
                        <BoxWithTooltip title={"Quick Slot Cost"} placement={"right"} sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "2px",
                            alignItems: "center",
                            justifyContent: "center"
                        }} >
                            <MdOutlineFlip size={24}/>
                            <Typography>{consumableTemplate.slotCost}</Typography>
                        </BoxWithTooltip>
                        <BoxWithTooltip title={"Downtime Successes"} placement={"right"} sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "2px",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <DowntimeTooltip tooltipKey={consumableTemplate.craftingType} size={24} />
                            <Typography >{(2**(consumableTemplate.itemTier-1))*getDowntimeTimeModifier(consumableTemplate.craftingType, consumableTemplate.itemName)}</Typography>
                        </BoxWithTooltip>
                    </Box>



                </Box>
            </Box>
            <Collapse
                    in={isOpen}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 1
                    }}
                >
                <Paper elevation={2} sx={{
                    padding: "12px"
                }}>
                    {currentText.map((desc, index) => {
                        return <HighlightType text={desc} xval={undefined} key={index}/>
                    })}
                </Paper>
            </Collapse>
            <Box
                sx={{
                    display: "flex",
                    marginTop: "-8px",
                    justifyContent: "center",
                    width: "100%",
                    padding: "2px"
                }}
            >
                <ExpandMore
                  expand={isOpen}
                  onClick={handleExpandClick}
                  aria-expanded={isOpen}
                  aria-label="show more"
                >
                  <ExpandMoreOutlined />
                </ExpandMore>
            </Box>

        </Paper>
    )
}

export default ConsumableCard_New