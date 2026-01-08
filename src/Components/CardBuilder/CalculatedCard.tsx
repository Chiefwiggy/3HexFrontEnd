import React, {useEffect, useState} from 'react'
import {
    Box,
    capitalize,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Typography
} from "@mui/material";
import AbstractCardCalculator from "../../Data/Card Calculators/AbstractCardCalculator";
import CardEffect from "../Cards/CardEffect";
import {ICommonCardData, IEffectData} from "../../Data/ICardData";
import {
    ElectricBoltOutlined,
    FlareOutlined,
    LooksOutlined,
    SportsMmaOutlined,
    WaterDropOutlined
} from "@mui/icons-material";
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
import {FaHeartbeat, FaRunning} from "react-icons/fa";
import {
    GiArcheryTarget,
    GiBorderedShield,
    GiBrokenShield,
    GiFist,
    GiLaserBurst,
    GiMagicShield,
    GiRun, GiTechnoHeart
} from "react-icons/gi";
import {FaRegClock} from "react-icons/fa6";
import {MdOutlineLooks, MdOutlineSportsMma} from "react-icons/md";
import ChannelType from "../../Utils/ChannelType";
import {GrTechnology} from "react-icons/gr";
import {IoInformationCircleOutline} from "react-icons/io5";
import {SiFoundryvirtualtabletop} from "react-icons/si";
import useSnackbar from "../../Hooks/useSnackbar/useSnackbar";

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
    const {SendToSnackbar} = useSnackbar();

    const [cardTitle, setCardTitle] = useState<string>("");

    const [validCard, setValidCard] = useState<boolean>(true);

    const [conditionalCard, setConditionalCard] = useState(false);

    useEffect(() => {
        cardCalculator.sendCurrentCards(depArray, owner);
        setCardTitle(overrideName ? overrideName : cardCalculator.getTitle())
        setEffectArray(cardCalculator.getEffectList());
        setValidCard(cardCalculator.isValid() && owner.areAllCardsPrepared(cardCalculator.getCards()))
        setConditionalCard(depArray.filter(e => e?.cardType == "condition").length > 0)
    }, [depArray, charPing, statPing, cancelPing, isReady]);

    const exportToFoundry = async() => {
        if (cardCalculator.isSummon()) {
            const summonData = cardCalculator.getSummonData()
            const finalPower = cardCalculator.getFinalPower()
            const type = cardCalculator.getType().toLowerCase()
            const hackString = cardCalculator.getIconValue("hackSet").split(" ")
            const spellString = cardCalculator.getIconValue("spellSet").split(" ")
            console.log(spellString)
            console.log(hackString);
            const exportObject = {
                "system.props.name": summonData.simpleName,
                "system.props.maxHealth": summonData.maxHealth.toString(),
                "system.props.maxStamina": "0",
                "system.props.maxTether": "0",
                "system.props.stamina_refresh": "0",
                "system.props.tether_refresh": "0",
                "system.props.basic_damage": type == "spell" ? finalPower.toString() : "0",
                "system.props.damage_type": cardCalculator.getDamageType(),
                "system.props.to_hit": type == "spell" ? (spellString[1] + spellString[3]) : "0",
                "system.props.spell_damage": type == "hack" ? finalPower.toString() : "0",
                "system.props.spell_damage_type": cardCalculator.getDamageType(),
                "system.props.spell_save": type == "hack" ? (hackString[1] + hackString[3]) : "0",
                "system.props.spell_save_type": type == "hack" ? hackString[0] : "N/A",
                "system.props.effective_range_min": "0",
                "system.props.effective_range_max": "0",
                "system.props.pDEF_evade": summonData.pDEF.toString(),
                "system.props.pDEF_block": "0",
                "system.props.mDEF_evade": summonData.mDEF.toString(),
                "system.props.mDEF_block": "0",
                "system.props.dodge_evade": summonData.dodge.toString(),
                "system.props.dodge_block": "0",
                "system.props.current_health": summonData.maxHealth.toString(),
                "system.props.current_stamina": "0",
                "system.props.current_tether": "0",
                "system.props.current_stance": "0",
                "system.props.isInEditMode": false,
                "system.props.isSpell": type == "hack"
            }
            await navigator.clipboard.writeText(JSON.stringify(exportObject, null, 2))
            SendToSnackbar("Copied Summon Data to Clipboard", "success")
        }
    }

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
                    <Typography variant={"h5"}
                        sx={{
                            wordBreak: cardTitle.length > 35 ? "break-all" : "break-word",
                            fontSize: cardTitle.length > 35 ? "1rem" : "1.5rem"
                        }}
                    >
                        {cardTitle}</Typography>
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
                {
                    !cardCalculator.hasCorrectChannels()
                    ?
                        <Box>
                            <Typography variant={"body2"} color={"red"}>Invalid Protocol. You are missing the following channels:</Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px"
                                }}
                            >
                                {cardCalculator.getBadChannels().map((channel, index) => {
                                    return (
                                        <ChannelType channelType={channel.channelType} channelStrength={channel.channelStrength} color={"red"} />
                                    )
                                })}
                            </Box>
                        </Box>
                        :
                        <></>
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
                                            fontSize: "12px",
                                            paddingRight: "4px",
                                        }}
                                        variant="body2"
                                        align="center"
                                    >
                                        {capitalize(cardCalculator.getSummonData().simpleName)} {capitalize(cardCalculator.getDamageSubtype() == "none" ? "" : cardCalculator.getDamageSubtype())} Summon
                                    </Typography>
                                </Box>

                                {
                                    cardCalculator.getType().toLowerCase() == "spell" ?
                                        <BoxWithTooltip
                                            sx={{
                                                display: 'flex',
                                                alignItems: "center"
                                            }}
                                            placement={"top"}
                                            title={cardCalculator.getSummonData().maxHealth === parseInt(cardCalculator.getIconValue("tetherCost")) ? `Max Health/Tether Cost` : `Max Health`}
                                        >
                                            <Typography sx={{fontSize: "16px", paddingRight: "4px"}}>{cardCalculator.getSummonData().maxHealth}</Typography><FaHeartbeat />
                                            {
                                                cardCalculator.getSummonData().maxHealth === parseInt(cardCalculator.getIconValue("tetherCost")) ?
                                                <WaterDropOutlined /> : <></>
                                            }

                                        </BoxWithTooltip>
                                        :
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
                                }

                                {
                                        cardCalculator.getSummonData().maxHealth !== parseInt(cardCalculator.getIconValue("tetherCost"))
                                            ?
                                            (cardCalculator.getType().toLowerCase() == "spell" ?
                                                    <BoxWithTooltip
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: "center"
                                                        }}
                                                        placement={"top"}
                                                        title={`Tether Cost`}
                                                    >
                                                        <Typography sx={{fontSize: "16px", paddingRight: "4px"}}>{cardCalculator.getIconValue("tetherCost")}</Typography><WaterDropOutlined />

                                                    </BoxWithTooltip>
                                                    :
                                                    <BoxWithTooltip
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: "center"
                                                        }}
                                                        placement={"top"}
                                                        title={`Technik Cost`}
                                                    >
                                                        <Typography sx={{fontSize: "16px", paddingRight: "4px"}}>{cardCalculator.getIconValue("technikCost")}</Typography><GrTechnology />

                                                    </BoxWithTooltip>
                                            )

                                            :
                                            <></>
                                    }
                                {
                                    cardCalculator.getType().toLowerCase() == "spell" ?
                                        <BoxWithTooltip
                                            sx={{
                                                display: 'flex',
                                                alignItems: "center"
                                            }}
                                            placement={"top"}
                                            title={`Action Cost`}
                                        >
                                            <Typography sx={{fontSize: "16px", paddingRight: "4px"}}>{cardCalculator.getIconValue("energyCost") || 1}</Typography><ElectricBoltOutlined />

                                        </BoxWithTooltip>
                                        :
                                        <BoxWithTooltip
                                            sx={{
                                                display: 'flex',
                                                alignItems: "center"
                                            }}
                                            placement={"top"}
                                            title={`Surge Cost`}
                                        >
                                            <Typography sx={{fontSize: "16px", paddingRight: "4px"}}>{cardCalculator.getIconValue("surgeCost")}</Typography><GiLaserBurst color={"#0096ff"}/>

                                        </BoxWithTooltip>
                                }




                            </Box>
                            <Divider sx={{flexGrow: 1}} />
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(6, 1fr)"
                                }}
                            >
                                <Box sx={{gridColumn: "span 3"}}>
                                    <NumericIcon val={cardCalculator.getFinalPower()}  icon={GiFist} postText={getDamageShorthand(cardCalculator.getDamageType())} postIcon={<SubtypeDamageIcon damageSubtype={cardCalculator.getDamageSubtype()}  />}/>
                                </Box >
                                <Box sx={{gridColumn: "span 3"}}>
                                    {
                                        cardCalculator.getType() == "spell" ?
                                            <NumericIcon fontSize={"16px"} align="right" val={`+${cardCalculator.getIconValue("spellSet").split(" ").slice(1).join()}`} icon={GiArcheryTarget} title={`To Hit`} />
                                            : <NumericIcon fontSize={"14px"} align="right" val={`${cardCalculator.getIconValue("hackSet")}`} icon={GiTechnoHeart} title={`Save`} />
                                    }
                                </Box>

                                {/*<>{cardCalculator.getIconValue("spellSet")}</>*/}

                                {/* Row 2 */}
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <NumericIcon
                                        fontSize="16px"
                                        align="left"
                                        val={cardCalculator.getSummonData().pDEF}
                                        icon={GiBorderedShield}
                                        title="pDEF"
                                    />
                                </Box>

                                <Box sx={{ gridColumn: "span 2" }}>
                                    <NumericIcon
                                        fontSize="16px"
                                        align="center"
                                        val={cardCalculator.getSummonData().mDEF}
                                        icon={GiMagicShield}
                                        title="mDEF"
                                    />
                                </Box>

                                <Box sx={{ gridColumn: "span 2" }}>
                                    <NumericIcon
                                        fontSize="16px"
                                        align="right"
                                        val={getSkillFormat(cardCalculator.getSummonData().dodge, false)}
                                        icon={FaRunning}
                                        title="Dodge"
                                    />
                                </Box>

                                {/* Row 3 */}
                                <Box sx={{ gridColumn: "span 2" }}>
                                    <NumericIcon
                                        fontSize="16px"
                                        align="left"
                                        val={cardCalculator.getSummonData().movement}
                                        icon={GiRun}
                                        title="Movement"
                                    />
                                </Box>

                                <Box sx={{ gridColumn: "span 2" }}>
                                    <NumericIcon
                                        fontSize="14px"
                                        align="center"
                                        val={` ${cardCalculator.getIconValue("duration")}`}
                                        icon={FaRegClock}
                                        title="Duration (rounds)"
                                        iconColor={
                                            parseInt(cardCalculator.getIconValue("duration")) > 0
                                                ? "white"
                                                : "red"
                                        }
                                        textColor={
                                            parseInt(cardCalculator.getIconValue("duration")) > 0
                                                ? "white"
                                                : "red"
                                        }
                                    />
                                </Box>

                                <Box sx={{ gridColumn: "span 2" }}>
                                    <NumericIcon
                                        align="right"
                                        fontSize="16px"
                                        val={createRangeString(cardCalculator.getFinalRange())}
                                        icon={LooksOutlined}
                                    />
                                </Box>



                            </Box>

                        </Box>
                        :
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: "1fr 1fr"
                        }}>
                            <NumericIcon val={cardCalculator.getFinalPower()}  icon={MdOutlineSportsMma} postText={getDamageShorthand(cardCalculator.getDamageType())} postIcon={<SubtypeDamageIcon damageSubtype={cardCalculator.getDamageSubtype()} />}/>
                            <NumericIcon
                                val={`${createRangeString(cardCalculator.getFinalRange())}`}
                                icon={MdOutlineLooks}
                            />
                            {
                                cardCalculator.getFinalIcons().map((data) => {
                                    return (
                                        <NumericIcon val={data.val} icon={data.icon} key={data.key} iconColor={data.color ?? "white"}/>
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
            <CardActions>
                {
                    cardCalculator.isSummon() ?
                        <IconButton
                            size={"small"}
                            aria-label={"use"}
                            onClick={exportToFoundry}
                        >
                            <SiFoundryvirtualtabletop />
                        </IconButton>
                        :
                        <></>
                }

            </CardActions>
        </Card>
    ) : <></>
}

export default CalculatedCard