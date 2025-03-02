import React, {useEffect, useState} from 'react'
import SpellBaseCard from "../Components/Cards/SpellBaseCard";
import {Box, Button, Divider, Grid, Paper, Typography} from "@mui/material";
import {
    ICommonCardData,
    IEffectData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData, USpellTypes
} from "../Data/ICardData";
import SpellTargetCard from "../Components/Cards/SpellTargetCard";
import SpellModifierCard from "../Components/Cards/SpellModifierCard";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import CumulativeSpellCard from "../Components/Cards/CumulativeSpellCard";
import CardList from "../Components/Cards/CardList";
import {ICardSendbackData} from "../Layouts/GenericCardLayout";
import CardSkeleton from "../Components/Cards/CardSkeleton";
import useAPI from "../Hooks/useAPI/useAPI";
import {default_spell_cards} from "../Data/default_cards";
import {SortCardList} from "../Utils/CardSorting";


interface ICardBuilderViewInput {
    closeSelf: (event: any) => void
}
const CardBuilderView = ({
    closeSelf
}: ICardBuilderViewInput) => {
    //
    // const [spellBase, setSpellBase] = useState<ISpellBaseCardData|null>(null);
    // const [spellTarget, setSpellTarget] = useState<ISpellTargetCardData|null>(null);
    // const [spellModifier, setSpellModifier] = useState<ISpellModifierCardData|null>(null);
    // const [spellEdict, setSpellEdict] = useState<ISpellModifierCardData|null>(null);
    //
    // const [currentFilter, setCurrentFilter] = useState<USpellTypes | "favorite">(null)
    //
    // const [allCards, setAllCards] = useState<Array<ICommonCardData>>([]);
    //
    // const [currentCards, setCurrentCards] = useState<Array<ICommonCardData>>([]);
    //
    // const {currentSheet} = useCharacter();
    // const { CardAPI } = useAPI();
    //
    // useEffect(() => {
    //     (async() => {
    //         if (currentSheet) {
    //             const cards = await CardAPI.GetCharacterPreparedSpells(currentSheet.data._id);
    //             setAllCards([...default_spell_cards, ...cards].sort(SortCardList))
    //         }
    //     })();
    //
    //
    // }, [])
    //
    // useEffect(() => {
    //     if (currentFilter == null) {
    //         setCurrentCards(allCards);
    //     } else if (currentFilter == "favorite") {
    //         setCurrentCards([]);
    //     } else {
    //         setCurrentCards(allCards.filter((card) => {
    //             return card.cardSubtype == currentFilter;
    //         }));
    //     }
    //
    // }, [allCards, currentFilter]);
    //
    // const receiveSpellFiltersCallback = (type: USpellTypes | "favorite") => (event: React.MouseEvent) => {
    //     setCurrentFilter(type);
    // }
    //
    // const sendSetSpellBase = (data: ICardSendbackData) => {
    //     if (data.action == 'add') {
    //         setSpellBase(data.cardData as ISpellBaseCardData);
    //     } else {
    //         setSpellBase(null);
    //     }
    // }
    //
    // const sendSetSpellTarget = (data: ICardSendbackData) => {
    //     if (data.action == 'add') {
    //         setSpellTarget(data.cardData as ISpellTargetCardData);
    //     } else {
    //         setSpellTarget(null);
    //     }
    // }
    //
    // const sendSetSpellModifier = (data: ICardSendbackData) => {
    //     if (data.action == 'add') {
    //         setSpellModifier(data.cardData as ISpellModifierCardData);
    //     } else {
    //         setSpellModifier(null);
    //     }
    // }
    //
    // const sendSetSpellEdict = (data: ICardSendbackData) => {
    //     if (data.action == 'add') {
    //         setSpellEdict(data.cardData as ISpellModifierCardData);
    //     } else {
    //         setSpellEdict(null);
    //     }
    //
    // }
    //
    // const handleListCallback = (data: ICardSendbackData) => {
    //     switch(data.cardData.cardSubtype) {
    //         case "base":
    //             sendSetSpellBase(data);
    //             break;
    //         case "target":
    //             sendSetSpellTarget(data);
    //             break;
    //         case "skill":
    //             sendSetSpellModifier(data);
    //             break;
    //         case "edict":
    //             sendSetSpellEdict(data);
    //             break;
    //     }
    // }
    //
    // const handleCreateSpell = () => (event: React.MouseEvent) => {
    //
    //     closeSelf(null);
    // }
    //
    //
    // // @ts-ignore
    // return (
    //     <Box
    //         sx={{
    //             width: "90vw",
    //             backgroundColor: "#121212",
    //             height: "100vh"
    //         }}
    //     >
    //         <Box
    //             sx={{
    //                 display: 'flex',
    //                 justifyContent: 'center',
    //                 flexWrap: 'wrap',
    //                 '& > :not(style)': {
    //                      m: 1,
    //                     width: "16vw",
    //                     minHeight: 128,
    //                     textAlign: 'center',
    //                 },
    //               }}
    //         >
    //             <CardSkeleton cardData={spellBase}
    //                           placeholderText={"BASE"}
    //                           CardElement={SpellBaseCard}
    //                           sendBack={sendSetSpellBase}
    //                           type={"base"}
    //             />
    //             <CardSkeleton cardData={spellTarget}
    //                           placeholderText={"TARGET"}
    //                           CardElement={SpellTargetCard}
    //                           sendBack={sendSetSpellTarget}
    //                           type={"target"}
    //             />
    //             <CardSkeleton cardData={spellModifier}
    //                           placeholderText={"SKILL"}
    //                           CardElement={SpellModifierCard}
    //                           sendBack={sendSetSpellModifier}
    //                           type={"skill"}
    //             />
    //             <CardSkeleton cardData={spellEdict}
    //                           placeholderText={"EDICT"}
    //                           CardElement={SpellModifierCard}
    //                           sendBack={sendSetSpellEdict}
    //                           type={"edict"}
    //             />
    //             {
    //                 spellBase && spellTarget && spellModifier ?
    //                         <CumulativeSpellCard cardBase={spellBase} cardTarget={spellTarget} cardModifiers={[spellModifier, spellEdict]} />
    //              :
    //             <Paper elevation={1} sx={{
    //                 display: 'flex',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 flexDirection: 'column'
    //             }}>
    //                 <Typography variant={"h5"}>Current Spell</Typography>
    //                 {spellBase ? <></> : <Typography sx={{
    //                     color: "red",
    //                     fontSize: "0.8rem"
    //                 }}>You must include a base or weapon.</Typography> }
    //                 {spellTarget ? <></> : <Typography sx={{
    //                     color: "red",
    //                     fontSize: "0.8rem"
    //                 }}>You must include a target.</Typography> }
    //                 {spellModifier ? <></> : <Typography sx={{
    //                     color: "red",
    //                     fontSize: "0.8rem"
    //                 }}>You must include a modifier.</Typography> }
    //             </Paper>
    //             }
    //
    //         </Box>
    //         <SpellFilters
    //             canCreateSpell={(spellBase != null && spellTarget != null && spellModifier != null)}
    //             createSpellCallback={handleCreateSpell}
    //             sendSpellFilterCallback={receiveSpellFiltersCallback}
    //         />
    //
    //         <Box
    //             className={"CardBuilderView"}
    //             sx={{
    //                 padding: "12px",
    //                 display: 'flex',
    //                 justifyContent: 'center'
    //             }}
    //         >
    //             <Grid container spacing={2} justifyContent={"center"}>
    //                 <CardList cardList={currentCards} onClickButton={handleListCallback}/>
    //             </Grid>
    //         </Box>
    //
    //     </Box>
    //
    // )
}

export default CardBuilderView;