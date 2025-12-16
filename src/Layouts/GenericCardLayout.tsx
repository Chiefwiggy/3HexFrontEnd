import React, {ReactNode, useEffect, useState} from 'react'
import {ICommonCardData, IWeaponCommonData} from "../Data/ICardData";
import {
    Box,
    capitalize,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    IconButton, Snackbar,
    Typography
} from "@mui/material";
import {
    AddCircleOutlined,
    ExpandLessOutlined,
    ExpandMoreOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined, RemoveCircleOutlined
} from "@mui/icons-material";
import {ExpandMore} from "../Elements/ExpandMore";
import Draggable from "../Elements/Draggable";
import {useDraggable} from "@dnd-kit/core";
import CardEffect from "../Components/Cards/CardEffect";
import {CardGetColor} from "../Utils/CardColorUtils";
import {IPrerequisite} from "../Data/GenericData";
import {GetPrerequisiteString} from "../Utils/PrerequisiteString";
import { TbInfoSmall } from "react-icons/tb";
import {IoInformationCircleOutline} from "react-icons/io5";
import useSnackbar from "../Hooks/useSnackbar/useSnackbar";



interface IGenericCardLayoutInput {
    cardData: ICommonCardData,
    sendBack: (data: ICardSendbackData) => void,
    isExpanded?: boolean,
    canToggleExpand?: boolean,
    isAdd?: boolean,
    showAdd?: boolean,
    canFavorite?: boolean,
    children: ReactNode,
    overrideSubtitle?: string | null,
    showPrerequisites?: boolean,
    isDraft?: boolean,
    titleExtra?: string,
    bannerOverride?: string | null
}

export interface ICardSendbackData {
    cardData: ICommonCardData,
    action: "remove" | "add"
}
const GenericCardLayout = ({
    cardData,
    sendBack,
    isExpanded = false,
    canToggleExpand = true,
    isAdd = true,
    showAdd  = true,
    canFavorite = true,
    children,
    overrideSubtitle,
    showPrerequisites=false, isDraft=false,
    titleExtra = "",
    bannerOverride = null
}: IGenericCardLayoutInput) => {

    const [expanded, setExpanded] = useState(isExpanded)
    const [isFavorite, setIsFavorite] = useState(cardData.isFavorite);
    const [prereqString, setPrereqString] = useState("None");

    const getPrereqPriority = (prereq: IPrerequisite) => {
        switch (prereq.prerequisiteType) {
            case "attribute":
                return 2;
            case "affinity":
                return 4;
            case "class":
                return 1;
            case "fateline":
                return 0;
            case "path":
                return 3;
            default:
                return 99;
        }
    }

    useEffect(() => {
        const str= GetPrerequisiteString(cardData.prerequisites);
        if (str != "") {
            setPrereqString(str);
        }
    }, [cardData.prerequisites])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleFavorite = () => {
        cardData.isFavorite = !isFavorite;
        setIsFavorite(!isFavorite)
    }

    const handleRemove = () => {
        sendBack({
            cardData: cardData,
            action: 'remove',

        });
    }

    const handleUseCard = () => {
        sendBack({
            cardData,
            action: 'add'
        });
    }

    const {SendToSnackbar} = useSnackbar();

    const handleCopyInfo = async() => {
        await window.navigator.clipboard.writeText(cardData._id)
        SendToSnackbar(`${cardData._id} copied to clipboard`, "info")
    }





    return (
        <Card
            className={"SpellBaseCard"}
            sx={{
                width: "16vw",
                minWidth: "264px",
                textAlign: "center",
                display: 'flex',
                flexDirection: 'column',

            }}
        >
            <Box
                sx={{
                    borderTop: `4px outset ${ CardGetColor(bannerOverride ? bannerOverride : `${cardData.cardType}.${cardData.cardSubtype}`)}`,
                    borderRight: cardData.isUltimate ? "2px solid gold" : "0px solid black",
                    borderLeft: cardData.isUltimate ? "2px solid gold" : "0px solid black",
                }}
            >
            <CardHeader
                title={(cardData.cardName + " " + titleExtra).trim()}

                subheader={
                    <>
                     {cardData.cardType.toUpperCase()} {cardData.cardType == "weapon" && cardData.cardSubtype != "base" ? (
                        (cardData as IWeaponCommonData).offhandOnly ? "• OFFHAND ONLY" : ((cardData as IWeaponCommonData).canUseForOffhand ? "• CAN OFFHAND" : "")
                    ): ""} {overrideSubtitle ? `• ${overrideSubtitle}` : (cardData.cardSubtype == "commander" ? "" : `• ${cardData.cardSubtype.toUpperCase()}`)} {cardData.isUltimate ? " • ULTIMATE" : ""}
                    </>
                }
                sx={{padding: "14px 0 0 0", userSelect: "none"}}
                titleTypographyProps={{
                    fontSize: 22
                }}
                subheaderTypographyProps={{
                    fontSize: 14
                }}
            />
            {
                showPrerequisites ?
                    <Box>
                        <Typography
                            variant={"body2"}
                            sx={{
                                color: "darkgray",
                                fontSize: "12px"
                            }}
                        >
                            Requirements: {prereqString}
                        </Typography>
                    </Box>
                    :
                    <></>
            }

            <Box
                sx={{
                    '&::before': isDraft ? {
                        content: '""',
                        display: 'block',
                        marginTop: "2px",
                        height: '16px', // thickness of the caution tape
                        background: 'repeating-linear-gradient(45deg, yellow 0, yellow 10px, black 10px, black 20px)',
                    } : {}
                }}
            >

            </Box>

            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{

            }}>
                <CardContent>
                    <Box sx={{flexGrow: 1}}>
                        {children}
                    </Box>
                    <br/>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        {
                            cardData.effects.map((data, index) => {
                                return <CardEffect effectData={data} key={index}/>
                            })
                        }
                    </Box>

                </CardContent>
            </Collapse>
            <CardActions disableSpacing sx={{marginTop: 'auto'}}>
                {
                    isDraft ?
                        <></>
                        :
                        <IconButton
                            size={"small"}
                            aria-label={"use"}
                            onClick={handleCopyInfo}
                        >
                            <IoInformationCircleOutline />
                        </IconButton>
                }

                { showAdd ? (
                    isAdd
                        ?
                        <IconButton
                            aria-label={"use"}
                            onClick={handleUseCard}
                        >
                            <AddCircleOutlined />
                        </IconButton>
                        :
                        <IconButton
                            aria-label={"remove"}
                            onClick={handleRemove}
                        >
                            <RemoveCircleOutlined/>
                        </IconButton>
                ) : <></>}

                {
                    canToggleExpand
                    ?
                        <ExpandMore
                          expand={expanded}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <ExpandMoreOutlined />
                        </ExpandMore>
                        :
                        <></>

                }


            </CardActions>
            </Box>
        </Card>
    )
}

export default GenericCardLayout