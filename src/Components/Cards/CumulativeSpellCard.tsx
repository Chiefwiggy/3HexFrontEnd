import React, {useEffect, useState} from "react";
import {Box, Button, Card, CardContent, CardHeader, Divider} from "@mui/material";
import GenericCardLayout from "../../Layouts/GenericCardLayout";
import {
    ICommonCardData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData
} from "../../Data/ICardData";
import NumericIcon from "./NumericIcon";
import {AccessTimeOutlined, LooksOutlined, SportsMmaOutlined, WaterDropOutlined} from "@mui/icons-material";
import CardEffect from "./CardEffect";
import {GetFinalSpellData, ITotalSpellStats} from "../../Utils/GetFinalSpellData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";


interface ICumulativeCardInput {
    cardBase: ISpellBaseCardData | null,
    cardTarget: ISpellTargetCardData | null,
    cardModifiers: Array<ISpellModifierCardData | null>
}

const CumulativeSpellCard = ({
     cardBase,
     cardTarget,
     cardModifiers
}: ICumulativeCardInput) => {

    // const sendBack = () => {
    // }
    //
    // const {currentSheet} = useCharacter();
    //
    // const [cardData, setCardData] = useState<ICommonCardData>({
    //     _id: "",
    //     cardName: "",
    //     cardType: "",
    //     cardSubtype: "",
    //     effects: [],
    //     prerequisites: []
    // })
    //
    // const [finalSpellStats, setFinalSpellStats] = useState<ITotalSpellStats>({
    //     tetherCost: 0,
    //     energyCost: 0,
    //     totalPower: 0,
    //     duration: 0,
    //     range: {
    //         min: 0,
    //         max: 0,
    //         isMelee: true
    //     }
    // });
    //
    // useEffect(() => {
    //     setCardData({
    //         _id: cardBase?._id + "_" + cardTarget?._id,
    //         cardName: (cardModifiers[0]?.cardName.split(" ")[0] ?? "") + " " + cardBase?.cardName,
    //         cardType: "spell",
    //         cardSubtype: "final",
    //         effects: [],
    //         prerequisites: []
    //     });
    //     if (cardBase && cardTarget && cardModifiers[0] && currentSheet) {
    //         setCardData({
    //             _id: cardBase?._id + "_" + cardTarget?._id,
    //             cardName: (cardModifiers[0]?.cardName.split(" ")[0] ?? "") + " " + cardBase?.cardName,
    //             cardType: "spell",
    //             cardSubtype: "final",
    //             effects: [...cardBase.effects, ...cardTarget.effects, ...cardModifiers[0].effects, ...cardModifiers[1]?.effects ?? []],
    //             prerequisites: []
    //         });
    //         setFinalSpellStats(GetFinalSpellData(cardBase, cardTarget, cardModifiers[0] as ISpellModifierCardData, cardModifiers[1], currentSheet.getStat("might")));
    //     }
    // }, [cardBase, cardTarget, cardModifiers, currentSheet]);
    //
    // return (
    //     <Card
    //         className={"SpellBaseCard"}
    //         sx={{
    //             width: "18vw",
    //             textAlign: "center",
    //             display: 'flex',
    //             flexDirection: 'column',
    //             borderTop: `4px outset white`,
    //             borderRight: cardData.isUltimate ? "2px solid gold" : "0px solid black",
    //             borderLeft: cardData.isUltimate ? "2px solid gold" : "0px solid black",
    //         }}
    //     >
    //
    //         <CardHeader
    //             title={cardData.cardName}
    //             subheader={
    //                 <>
    //                     {cardData.cardType.toUpperCase()} • {cardData.cardSubtype.toUpperCase()} {cardData.isUltimate ? " • ULTIMATE" : ""}
    //                 </>
    //             }
    //             sx={{padding: "16px 0 0 0"}}
    //         />
    //         <CardContent>
    //             <Box sx={{
    //                 display: 'grid',
    //                 gridTemplateColumns: "1fr 1fr"
    //             }}>
    //                 <NumericIcon val={finalSpellStats.tetherCost} icon={WaterDropOutlined}/>
    //                 <NumericIcon val={finalSpellStats.totalPower}  icon={SportsMmaOutlined}/>
    //                 <NumericIcon val={finalSpellStats.duration} icon={AccessTimeOutlined}/>
    //                 <NumericIcon
    //                     val={`${finalSpellStats.range.isMelee ? "M" : "R"}${finalSpellStats.range.min} - ${finalSpellStats.range.isMelee ? "M" : "R"}${finalSpellStats.range.max}`}
    //                     icon={LooksOutlined}/>
    //
    //             </Box>
    //             <br/>
    //             <Box
    //                 sx={{
    //                     display: "flex",
    //                     flexDirection: "column",
    //                     maxHeight: '220px',
    //                     overflowY: 'scroll',
    //                     scrollbarColor: '#6b6b6b #2b2b2b',
    //                     scrollbarWidth: 'thin',
    //                 }}
    //             >
    //                 {
    //                     cardData.effects.map((data) => {
    //                         return <CardEffect effectData={data} finalPower={finalSpellStats.totalPower} key={data.text}/>
    //                     })
    //                 }
    //             </Box>
    //         </CardContent>
    //     </Card>
    // )
}

export default CumulativeSpellCard;