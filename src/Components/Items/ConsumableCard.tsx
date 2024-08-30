import React, { useEffect, useState } from 'react';
import {Box, capitalize, Collapse, Divider, Paper, Switch, Typography} from "@mui/material";
import {EConsumableType, IConsumableTemplate} from "../../Data/IConsumable";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import { ICharacterStats } from "../../Data/ICharacterData";
import {ExpandMoreOutlined, FlipOutlined, LinearScaleOutlined, WaterDropOutlined} from "@mui/icons-material";
import {ExpandMore} from "../../Elements/ExpandMore";

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

    const GetScaledDescription = (desc: string, index: number) => {
        let newT = consumableTemplate.basePower;
        if (currentSheet) {
            if (consumableTemplate.skillScaling !== "none") {
                newT += (currentSheet.data.characterStats[consumableTemplate.skillScaling as keyof ICharacterStats].value ?? 0) * consumableTemplate.potency;
            }
            switch (consumableTemplate.itemType) {
                case EConsumableType.HEALING:
                    newT += currentSheet?.getAbilityBonuses("consumableHealing")
                    break;
                case EConsumableType.BOMB:
                    newT += currentSheet?.getAbilityBonuses("bombDamage")
                    break;
                case EConsumableType.TRAP:
                    newT += currentSheet?.getAbilityBonuses("trapDamage")
                    break;
            }
        }

        const scaled = desc.split("[X]").map((e, i) => (
            <Typography key={`scaled-desc-${index}-${i}`} component={"span"} sx={{fontSize: "inherit"}}>{e}</Typography>
        ));

        const newScaled = scaled.reduce((pv: any, cv: any, i) => {
            if (i < scaled.length - 1) {
                return [...pv, cv, <Typography
                    color={"primary"}
                    component={"span"}
                    key={`scaled-value-${index}-${i}`} sx={{fontSize: "inherit"}}
                >
                    {newT}
                </Typography>]
            }
            return [...pv, cv]
        }, []);

        return (
            <Typography key={`scaled-${index}`} sx={{ textAlign: "center", fontSize: "16px" }}>
                {newScaled}
            </Typography>
        );
    }

    const GetUnscaledDescription = (desc: string, index: number) => {
        let newT = `${consumableTemplate.basePower}`;
        if (consumableTemplate.potency > 0 && consumableTemplate.skillScaling !== "none") {
            newT += " + ("
            if (consumableTemplate.potency !== 1) {
                newT += `${consumableTemplate.potency} * `
            }
            newT += `your ${capitalize(consumableTemplate.skillScaling)})`
        }

        const unscaled = desc.split("[X]").map((e, i) => (
            <Typography key={`unscaled-desc-${index}-${i}`} component={"span"}  sx={{fontSize: "inherit"}}>{e}</Typography>
        ));

        const newUnscaled = unscaled.reduce((pv: any, cv: any, i) => {
            if (i < unscaled.length - 1) {
                return [...pv, cv, <Typography
                    color={"secondary"}
                    component={"span"}
                    key={`unscaled-value-${index}-${i}`} sx={{fontSize: "inherit"}}
                >
                    {newT}
                </Typography>]
            }
            return [...pv, cv]
        }, []);

        return (
            <Typography key={`unscaled-${index}`} sx={{fontSize: "16px"}}>
                {newUnscaled}
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
                        }}>ITEM • {consumableTemplate.itemType.toUpperCase()}</Typography>
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
                                }}>{consumableTemplate.slotCost}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{
                    width: "90%",
                    paddingTop: "4px",
                    marginBottom: "4px"
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
                    {currentSheet && isScaled
                        ? scaledDescriptions.map((e, index) => (
                            <Box key={`scaled-box-${index}`} sx={{ textAlign: "center", paddingBottom: "2px" }}>{e}</Box>
                        ))
                        : unscaledDescriptions.map((e, index) => (
                            <Box key={`unscaled-box-${index}`} sx={{ textAlign: "center", paddingBottom: "2px" }}>{e}</Box>
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
