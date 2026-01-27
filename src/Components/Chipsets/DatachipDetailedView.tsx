import React, {useState} from 'react';
import {Box, capitalize, Card, Collapse, Divider, IconButton, ListItem, Paper, Typography} from "@mui/material";
import {IDatachipData} from "../../Data/ChipsetData";
import SourceList from "../Sources/SourceList";
import SpellBaseCard from "../Cards/SpellBaseCard";
import {
    IHackBaseCardData, IHackIOCardData,
    IHackModifierCardData, IHackProtocolCardData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    IWeaponCommonData
} from "../../Data/ICardData";
import SpellModifierCard from "../Cards/SpellModifierCard";
import WeaponModCard from "../Cards/WeaponModCard";
import {AddOutlined, ExpandMoreOutlined} from "@mui/icons-material";
import {ExpandMore} from "../../Elements/ExpandMore";
import useUser from "../../Hooks/useUser/useUser";
import useAPI from "../../Hooks/useAPI/useAPI";
import {useNavigate} from "react-router-dom";
import HackBaseCard from "../Cards/HackBaseCard";
import HackIOCard from "../Cards/HackIOCard";
import HackProtocolCard from "../Cards/HackProtocolCard";
import HackModifierCard from "../Cards/HackModifierCard";
import {getHackShorthand, UHackType} from "../../Utils/Shorthand";
import {CardGetColor} from "../../Utils/CardColorUtils";

interface IDatachipDetailedViewInput {
    datachipData: IDatachipData
}

const DatachipDetailedView = ({datachipData}: IDatachipDetailedViewInput) => {


    const [currentIndex, setCurrentIndex] = useState(0);

    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    }


    const handleSetIndex = (newIndex: number) => (event: React.MouseEvent<any>) => {
        setCurrentIndex(newIndex);
    }

    const renderCard = (cardData: IHackModifierCardData) => {
        const compendiumProps = {canToggleExpand: false, showAdd: false, isExpanded: true}
        switch (cardData.cardSubtype) {
            case "function":
                return <HackBaseCard cardData={cardData as IHackBaseCardData} sendBack={() => {}} {...compendiumProps} />
            case "io":
                return <HackIOCard cardData={cardData as IHackIOCardData} sendBack={() => {}} {...compendiumProps} />
            case "protocol":
                return <HackProtocolCard cardData={cardData as IHackProtocolCardData} sendBack={() => {}} {...compendiumProps} />
            case "util":
                return <HackModifierCard cardData={cardData} sendBack={() => {}} {...compendiumProps} />
            default:
                <></>
        }
    }


    return (
        <Card elevation={2} sx={{
            padding: "12px",
            margin: "12px"
        }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center"
                }}
            >
                {datachipData.datachipName}
            </Typography>
            <Typography
                variant={"subtitle1"}
                sx={{
                    color: "lightgrey",
                    textAlign: "center"
                }}
            >
                TIER {datachipData.chipTier}
            </Typography>
            <Divider sx={{margin: "12px"}} />

            <Collapse in={isExpanded} timeout={"auto"} unmountOnExit>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                    <Box>
                        <Typography>Base Technik</Typography>
                        <Typography variant={"h5"} textAlign={"center"}>{datachipData.baseTechnikCapacity}</Typography>
                    </Box>
                    <Box>
                        <Typography>{capitalize(datachipData.primaryTechnikStat)} Scaling</Typography>
                        <Typography variant={"h5"} textAlign={"center"}>x{datachipData.primaryTechnikScaling}</Typography>
                    </Box>
                    <Box>
                        <Typography>{capitalize(datachipData.secondaryTechnikStat)} Scaling</Typography>
                        <Typography variant={"h5"} textAlign={"center"}>x{datachipData.secondaryTechnikScaling}</Typography>
                    </Box>
                </Box>
                <Divider sx={{margin: "12px"}} />
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr"
                    }}
                >
                    <Box>
                        {datachipData.builtinHacks.map(((hack, index) => {
                            return (
                                <ListItem

                                    key={hack._id}
                                    sx={{
                                        px: 2,
                                        py: 0.6,
                                        ...(currentIndex === index
                                            ? { backgroundColor: "#454545" }
                                            : {
                                                '&:hover': {
                                                    backgroundColor: "#343434",
                                                },
                                            }),
                                    }}
                                    onClick={handleSetIndex(index)}
                                >
                                    <Box
                                        sx={{
                                            width: "4px",
                                            height: "18px",
                                            backgroundColor: CardGetColor(`hack.${hack.cardSubtype}`),
                                        }}
                                    ></Box>
                                    <Typography sx={{
                                        textAlign: "right",
                                        width: "100%",
                                    }} variant={"body2"}>
                                        {hack.cardName}

                                    </Typography>
                                </ListItem>
                            )
                        }))}
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            {
                                renderCard(datachipData.builtinHacks[currentIndex])
                            }

                        </Box>
                    </Box>

                </Box>

            </Collapse>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                <ExpandMore
                    expand={isExpanded}
                    onClick={handleExpandClick}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                >
                    <ExpandMoreOutlined />
                </ExpandMore>
            </Box>
        </Card>
    )
}

export default DatachipDetailedView