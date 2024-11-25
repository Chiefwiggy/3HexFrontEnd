import React, {useEffect, useState} from 'react';
import {Box, capitalize, Collapse, Divider, Paper, Switch, Typography} from "@mui/material";
import {EConsumableCraftingType, EConsumableType, IConsumableTemplate} from "../../Data/IConsumable";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {ICharacterStats} from "../../Data/ICharacterData";
import {ExpandMoreOutlined, FlipOutlined, LinearScaleOutlined, WaterDropOutlined} from "@mui/icons-material";
import {ExpandMore} from "../../Elements/ExpandMore";
import {romanize} from "../../Utils/Shorthand";
import SubtypeDamageIcon from '../SmallComponents/SubtypeDamageIcon';
import {UDamageSubtype} from "../../Data/ICardData";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import { GiSparkSpirit } from 'react-icons/gi';
import { FaGripfire } from 'react-icons/fa6';

interface IConsumableCardInput {
    consumableTemplate: IConsumableTemplate,
    defaultScaled: boolean
}

const ConsumableCard = ({ consumableTemplate, defaultScaled = false }: IConsumableCardInput) => {

    const { currentSheet, charPing } = useCharacter();

    const [scaledDescriptions, setScaledDescriptions] = useState<Array<JSX.Element>>([]);
    const [unscaledDescriptions, setUnscaledDescriptions] = useState<Array<JSX.Element>>([]);
    const [isScaled, setIsScaled] = useState<boolean>(defaultScaled);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setUnscaledDescriptions(consumableTemplate.description.map((desc, index) => GetUnscaledDescription(desc, index)));
        setScaledDescriptions(consumableTemplate.description.map((desc, index) => GetScaledDescription(desc, index)));
    }, [consumableTemplate]);

    useEffect(() => {
        setScaledDescriptions(consumableTemplate.description.map((desc, index) => GetScaledDescription(desc, index)));
    }, [charPing])

    const handleSwitch = () => {
        setIsScaled(!isScaled)
    }

    const handleExpandClick = () => {
        setIsOpen(!isOpen);
    }

    const GetSlotCost = () => {
        let finalCost = consumableTemplate.slotCost
        if (currentSheet) {
            switch (consumableTemplate.itemType) {
                case EConsumableType.HEALING:
                    finalCost += currentSheet.getAbilityBonuses("healingSlotCost");
                    break;
                case EConsumableType.CONTAINER:
                    finalCost += currentSheet.getAbilityBonuses("moneySlotCost");
                    break;
            }
            switch (consumableTemplate.craftingType) {
                case EConsumableCraftingType.BOMB:
                    finalCost += currentSheet.getAbilityBonuses("bombSlotCost");
                    break;
                case EConsumableCraftingType.TRAP:
                    finalCost += currentSheet.getAbilityBonuses("trapSlotCost");
                    break;
                case EConsumableCraftingType.TOTEM:
                    finalCost += currentSheet.getAbilityBonuses("totemSlotCost");
                    break;
            }
        }
        return Math.max(1, finalCost + (currentSheet?.getAbilityBonuses("allSlotCost") ?? 0))
    }

    const GetScaledDescription = (desc: string, index: number) => {
        const newTVals: Array<string> = consumableTemplate.xVals.map((ct) => {
            let newT = ct.basePower;
            if (currentSheet) {
                if (ct.skillScaling !== "none") {
                    newT += (currentSheet.data.characterStats[ct.skillScaling as keyof ICharacterStats].value ?? 0) * ct.potency;
                }
                switch (consumableTemplate.itemType) {
                    case EConsumableType.HEALING:
                        newT += currentSheet?.getAbilityBonuses("consumableHealing")
                        break;
                    case EConsumableType.CONTAINER:
                        newT *= currentSheet?.getAbilityBonuses("moneyPouchCapacity");
                        break;
                }
                switch(consumableTemplate.craftingType) {
                    case EConsumableCraftingType.BOMB:
                        newT += currentSheet?.getAbilityBonuses("bombDamage")
                        break;
                    case EConsumableCraftingType.TRAP:
                        newT += currentSheet?.getAbilityBonuses("trapDamage")
                        break;
                    case EConsumableCraftingType.TOTEM:
                        newT += currentSheet?.getAbilityBonuses("totemHealth")
                        break;
                }
                newT = Math.floor(newT);
            }
            return `${newT}` || ""
        })



        const scaled = desc.split(/(\[X\d+\]|\[damageType:[a-z]+\])/i).map((e, i) => {
            const xMatch = e.match(/\[X(\d+)\]/); // Match [X<number>]
            if (xMatch) {
                const index = parseInt(xMatch[1], 10); // Extract the index number
                return (
                    <Typography
                        key={`scaled-value-${index}-${i}`}
                        color="primary"
                        component="span"
                        sx={{ fontSize: "inherit" }}
                    >
                        {newTVals[index - 1]}
                    </Typography>
                );
            }

            const dtMatch = e.match(/\[damageType:([a-z]+)\]/i); // Match [DT:<type>]
            if (dtMatch) {
                const damageType = dtMatch[1];
                return (
                    <Typography
                        key={`unscaled-desc-${i}`}
                        component="span"
                        sx={{ fontSize: "inherit" }}
                    >
                        <SubtypeDamageIcon damageSubtype={damageType as UDamageSubtype} component="span" boxSx={{display: "inline-flex"}}/>
                    </Typography>
                );
            }

            return (
                <Typography
                    key={`scaled-desc-${i}`}
                    component="span"
                    sx={{ fontSize: "inherit" }}
                >
                    {e}
                </Typography>
            );
        });


        return (
            <Typography key={`scaled-${index}`} sx={{ textAlign: "center", fontSize: "16px" }}>
                {scaled}
            </Typography>
        );
    }

    const GetUnscaledDescription = (desc: string, index: number) => {
        const newTVals: Array<string> = consumableTemplate.xVals.map((ct) => {
            let newT = `${ct.basePower}`;
            if (ct.potency > 0 && ct.skillScaling !== "none") {
                newT += " + ("
                if (ct.potency !== 1) {
                    newT += `${ct.potency} * `
                }
                newT += `your ${capitalize(ct.skillScaling)})`
            }
            return newT
        })


        const unscaled = desc.split(/(\[X\d+\]|\[damageType:[a-z]+\])/i).map((e, i) => {
            const xMatch = e.match(/\[X(\d+)\]/); // Match [X<number>]
            if (xMatch) {
                const index = parseInt(xMatch[1], 10);
                return (
                    <Typography
                        key={`unscaled-value-${index}-${i}`}
                        color="secondary"
                        component="span"
                        sx={{ fontSize: "inherit" }}
                    >
                        {newTVals[index - 1]}
                    </Typography>
                );
            }

            const dtMatch = e.match(/\[damageType:([a-z]+)\]/i); // Match [DT:<type>]
            if (dtMatch) {
                const damageType = dtMatch[1];
                return (
                    <Typography
                        key={`unscaled-desc-${i}`}
                        component="span"
                        sx={{ fontSize: "inherit" }}
                    >
                        <SubtypeDamageIcon damageSubtype={damageType as UDamageSubtype} component="span" boxSx={{display: "inline-flex"}}/>
                    </Typography>
                );
            }

            return (
                <Typography
                    key={`unscaled-desc-${i}`}
                    component="span"
                    sx={{ fontSize: "inherit" }}
                >
                    {e}
                </Typography>
            );
        });

        return (
            <Typography key={`unscaled`} sx={{ fontSize: "16px" }}>
                {unscaled}
            </Typography>
        );
    }

    return (
        <Paper elevation={2}
            sx={{
                borderRadius: "12px",
            }}
        >
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <LinearScaleOutlined />
                        <Switch size={"small"} checked={isScaled} onChange={handleSwitch} disabled={!currentSheet} />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Typography variant={"h5"} sx={{
                            textAlign: "center"
                        }}>{consumableTemplate.itemName}</Typography>
                        <Typography variant={"subtitle1"} sx={{
                            color: "darkgray"
                        }}>{consumableTemplate.craftingType.toUpperCase()} • {consumableTemplate.itemType.toUpperCase()}</Typography>
                    </Box>
                    <Box>
                        {
                            consumableTemplate.tetherCost
                                ?
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <WaterDropOutlined />
                                    <Typography sx={{
                                        paddingTop: "2px"
                                    }}>{consumableTemplate.tetherCost}</Typography>
                                </Box>
                                :
                                <></>
                        }
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <FlipOutlined />
                                <Typography sx={{
                                    paddingTop: "2px"
                                }}>{GetSlotCost()}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{
                    width: "90%",
                    paddingTop: "4px"
                }} />

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
                    {
                            consumableTemplate.itemCost
                                ?
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Typography sx={{
                                        marginTop: "-10px",
                                        marginBottom: "4px",
                                        color: "darkgray",
                                        fontSize: "0.9rem"
                                    }}>${consumableTemplate.itemCost} / ${consumableTemplate.materialCost}</Typography>
                                </Box>
                                :
                                <></>
                        }
                    {currentSheet && isScaled
                        ? scaledDescriptions.map((e, index) => (
                            <Paper elevation={1} key={`scaled-box-${index}`} sx={{ textAlign: "center", paddingBottom: "2px", padding: "12px"}}>{e}</Paper>
                        ))
                        : unscaledDescriptions.map((e, index) => (
                            <Paper elevation={1} key={`unscaled-box-${index}`} sx={{ textAlign: "center", paddingBottom: "2px", padding: "12px"}}>{e}</Paper>
                        ))
                    }
                </Collapse>
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

export default ConsumableCard;
