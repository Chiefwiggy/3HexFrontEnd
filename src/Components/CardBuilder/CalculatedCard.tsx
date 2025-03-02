import React, {useEffect, useState} from 'react'
import {Box, capitalize, Card, CardContent, CardHeader, Divider, Typography} from "@mui/material";
import AbstractCardCalculator from "../../Data/Card Calculators/AbstractCardCalculator";
import CardEffect from "../Cards/CardEffect";
import {ICommonCardData, IEffectData} from "../../Data/ICardData";
import {FlareOutlined, LooksOutlined, SportsMmaOutlined} from "@mui/icons-material";
import NumericIcon from "../Cards/NumericIcon";
import CritNumberBox from "../SmallComponents/CritNumberBox";
import {createRangeString} from "../../Utils/helper_functions";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {ICardBuilderType} from "../../Layouts/CardBuilder";
import {getDamageShorthand, getSkillFormat} from "../../Utils/Shorthand";
import AbstractSheet from "../../Data/AbstractSheet";
import MinionSheet from "../../Data/MinionSheet";
import CharacterSheet from "../../Data/CharacterSheet";
import SubtypeDamageIcon from "../SmallComponents/SubtypeDamageIcon";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import {FaHeartbeat} from "react-icons/fa";
import {GiArcheryTarget, GiBorderedShield, GiBrokenShield, GiFist, GiRun} from "react-icons/gi";
import {FaRegClock} from "react-icons/fa6";

interface ICalculatedCardInput {
    cardCalculator: AbstractCardCalculator
    depArray: Array<ICommonCardData|null>,
    overrideName?: string,
    overrideWidth?: number,
    owner: AbstractSheet
}
const CalculatedCard = ({
    cardCalculator,
    depArray,
    overrideName = "",
    overrideWidth,
    owner
}: ICalculatedCardInput) => {


    const [effectArray, setEffectArray] = useState<Array<IEffectData>>([]);

    const { charPing, statPing, cancelPing, isReady} = useCharacter();

    const [cardTitle, setCardTitle] = useState<string>("");

    const [validCard, setValidCard] = useState<boolean>(true);

    const [conditionalCard, setConditionalCard] = useState(false);

    useEffect(() => {
        cardCalculator.sendCurrentCards(depArray, owner);
        setCardTitle(overrideName ? overrideName : cardCalculator.getTitle())
        setEffectArray(cardCalculator.getEffectList());
        setValidCard(owner.areAllCardsPrepared(cardCalculator.getCards()))
        setConditionalCard(depArray.filter(e => e?.cardType == "condition").length > 0)
    }, [depArray, charPing, statPing, cancelPing, isReady]);

    return owner ? (
        <Card
            sx={{
                width: overrideWidth ? `${overrideWidth}vw` : "18vw",
                minWidth: "264px",
                textAlign: "center",
                display: 'flex',
                flexDirection: 'column',
                borderTop: `4px outset ${cardCalculator.getFinalTopColor()}`,
                opacity: validCard ? "100%" : "50%"
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <Typography variant={"h5"}>{cardTitle}</Typography>
                    {
                        conditionalCard ?
                            <>
                                <FlareOutlined />
                            </>
                            :
                            <></>
                    }
                </Box>
                <Box>
                    <Typography sx={{color: "darkgray"}}>{cardCalculator.getType()}</Typography>
                </Box>
                <Box>
                    <Typography variant={"subtitle2"} sx={{
                        color: "darkgray"
                    }}>{cardCalculator.getAllCardNames() }</Typography>
                </Box>
            </CardContent>

            {
                validCard ? <></> :
                    <Box>
                        <Typography variant={"body2"} color={"red"}>Not all cards prepared.</Typography>
                    </Box>
            }

            <CardContent>
                {
                    cardCalculator.isSummon() ?
                        <Box>
                            <Box
                                aria-description={"header"}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: "flex-end"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: "16px",
                                            paddingRight: "4px",
                                        }}
                                        variant="body2"
                                        align="center"
                                    >
                                        {capitalize(cardCalculator.getSummonData().simpleName)} {capitalize(cardCalculator.getDamageSubtype() == "none" ? "" : cardCalculator.getDamageSubtype())} Summon
                                    </Typography>
                                </Box>
                                <BoxWithTooltip
                                    sx={{
                                        display: 'flex',
                                        alignItems: "center"
                                    }}
                                    placement={"top"}
                                    title={`Max Health`}
                                >
                                    <Typography sx={{fontSize: "16px", paddingRight: "4px"}}>{cardCalculator.getSummonData().maxHealth}</Typography><FaHeartbeat />
                                </BoxWithTooltip>

                            </Box>
                            <Divider sx={{flexGrow: 1}} />
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr"
                                }}
                            >
                                <NumericIcon val={cardCalculator.getFinalPower()}  icon={GiFist} postText={getDamageShorthand(cardCalculator.getDamageType())} postIcon={<SubtypeDamageIcon damageSubtype={cardCalculator.getDamageSubtype()} />}/>
                                <NumericIcon fontSize={"16px"} align="center" val={`${getSkillFormat(parseInt(cardCalculator.getIconValue("spellSet")))}`} icon={GiArcheryTarget} title={`To Hit`} />
                                <NumericIcon fontSize={"16px"} align="right" val={` ${cardCalculator.getIconValue("duration")}`} icon={FaRegClock} title={`Duration (rounds)`} iconColor={(parseInt(cardCalculator.getIconValue("duration")) > 0) ? "white" : "red"} textColor={(parseInt(cardCalculator.getIconValue("duration")) > 0) ? "white" : "red"}/>

                                <NumericIcon fontSize={"16px"} val={cardCalculator.getSummonData().pDEF} icon={GiBorderedShield} title={`pDEF`} />
                                <NumericIcon fontSize={"16px"} align="center" val={cardCalculator.getSummonData().mDEF} icon={GiBrokenShield} title={`mDEF`} />
                                <NumericIcon fontSize={"16px"} align="right" val={cardCalculator.getSummonData().movement} icon={GiRun} title={`Movement`}/>
                            </Box>

                        </Box>
                        :
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: "1fr 1fr"
                        }}>
                            <NumericIcon val={cardCalculator.getFinalPower()}  icon={SportsMmaOutlined} postText={getDamageShorthand(cardCalculator.getDamageType())} postIcon={<SubtypeDamageIcon damageSubtype={cardCalculator.getDamageSubtype()} />}/>
                            <NumericIcon
                                val={`${createRangeString(cardCalculator.getFinalRange())}`}
                                icon={LooksOutlined}
                            />
                            {
                                cardCalculator.getFinalIcons().map((data) => {
                                    return (
                                        <NumericIcon val={data.val} icon={data.icon} key={data.key}/>
                                    )
                                })
                            }


                        </Box>

                }

                {
                    cardCalculator.getCrit() ?
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: "space-around",
                                marginTop: '8px'
                            }}
                        >
                            <CritNumberBox value={cardCalculator.getCrit()?.d1 ?? ""}/>
                            <CritNumberBox value={cardCalculator.getCrit()?.d2 ?? ""}/>
                            <CritNumberBox value={cardCalculator.getCrit()?.d3 ?? ""}/>
                            <CritNumberBox value={cardCalculator.getCrit()?.d4 ?? ""}/>
                            <CritNumberBox value={cardCalculator.getCrit()?.d5 ?? ""}/>
                            <CritNumberBox value={cardCalculator.getCrit()?.d6 ?? ""}/>
                        </Box>
                        :
                        <></>
                }




                <br/>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: '220px',
                        overflowY: 'scroll',
                        scrollbarColor: '#6b6b6b #2b2b2b',
                        scrollbarWidth: 'thin',
                    }}
                >
                    {
                        effectArray.filter((e) => e.icon.emblem != "default").map((data, index) => {
                            return <CardEffect effectData={data} finalPower={cardCalculator.getFinalPower()} key={index}/>
                        })
                    }
                </Box>
            </CardContent>
        </Card>
    ) : <></>
}

export default CalculatedCard