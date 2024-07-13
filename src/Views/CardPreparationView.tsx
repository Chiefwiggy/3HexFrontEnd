import React, {useEffect, useState} from 'react'
import {Box, Button, Grid, Typography} from "@mui/material";
import {ICommonCardData, ISpellBaseCardData, ISpellModifierCardData, ISpellTargetCardData} from "../Data/ICardData";
import SpellBaseCard from "../Components/Cards/SpellBaseCard";
import SpellTargetCard from "../Components/Cards/SpellTargetCard";
import SpellModifierCard from "../Components/Cards/SpellModifierCard";
import CardList from "../Components/Cards/CardList";
import CardListScrollable from "../Components/Cards/CardListScrollable";
import {ICardSendbackData} from "../Layouts/GenericCardLayout";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import useUser from "../Hooks/useUser/useUser";
import useAPI from "../Hooks/useAPI/useAPI";

interface ICardPreparationViewInput {
    closeSelf: (event: React.MouseEvent) => void
}
const CardPreparationView = ({closeSelf}: ICardPreparationViewInput) => {

    const [allCards, setAllCards] = useState<Array<ICommonCardData>>([]);
    const [notPreparedCards, setNotPreparedCards] = useState<Array<ICommonCardData>>([]);
    const [currentPreparedCards, setCurrentPreparedCards] = useState<Array<ICommonCardData>>([])

    const {currentSheet} = useCharacter();

    const {CardAPI, CharacterAPI} = useAPI();

    useEffect(() => {
        if (currentSheet) {
            (async() => {
                const apiData = currentSheet.allButDefaultCards;
                console.log(apiData);
                if (apiData) {
                    const allPlayerCards = [...apiData.spells.bases, ...apiData.spells.targets, ...apiData.spells.modifiers, ...apiData.weapons.forms, ...apiData.weapons.skills, ...apiData.weapons.bases.filter(e => !currentSheet.data.knownWeapons.includes(e._id))];
                    console.log(currentSheet.data.knownWeapons);
                    console.log(...apiData.weapons.bases);
                    setAllCards(allPlayerCards);
                    console.log(allPlayerCards.filter(c => !currentSheet.data.preparedCards.includes(c._id)));
                    setNotPreparedCards(allPlayerCards.filter(c => !currentSheet.data.preparedCards.includes(c._id)));
                    setCurrentPreparedCards(allPlayerCards.filter(c => currentSheet.data.preparedCards.includes(c._id)));
                }
            })();
        }
    }, [])


    const handleAddCard = (data: ICardSendbackData) => {
        setCurrentPreparedCards([...currentPreparedCards, data.cardData].sort(sortCards))
        setNotPreparedCards(notPreparedCards.filter((elem) => elem !== data.cardData));
    }

    const handleRemoveCard = (data: ICardSendbackData) => {
        setNotPreparedCards([...notPreparedCards, data.cardData].sort(sortCards))
        setCurrentPreparedCards(currentPreparedCards.filter((elem) => elem !== data.cardData));
    }

    const handleSubmitSaveCards = async (e: React.MouseEvent) => {
        const idsList: Array<string> = currentPreparedCards.map(e => e._id);
        console.log(idsList);
        if (currentSheet) {
            await CharacterAPI.SetPreparedSpells(currentSheet?.data._id, idsList);
            currentSheet.setPreparedCards(idsList);
            closeSelf(e);
        }
    }

    const sortCards = (a: ICommonCardData, b: ICommonCardData): number => {

        if (a.isFavorite && b.isFavorite && a.isFavorite !== b.isFavorite) {
            return Number(a.isFavorite);
        }

        else if (a.cardType !== b.cardType) {
            return a.cardType.localeCompare(b.cardType);
        } else if (a.cardSubtype !== b.cardSubtype) {
            const subtypePriority = (elem: string): number => {
                switch (elem) {
                    case "base":
                        return 1;
                    case "target":
                        return 2;
                    case "skill":
                        return 3;
                    case "edict":
                        return 4;
                    default:
                        return 5;
                }
            }
            return subtypePriority(a.cardSubtype) - subtypePriority(b.cardSubtype);
        } else {
            return a.cardName.localeCompare(b.cardName);
        }
    }

    return currentSheet ? (
        <Box
            sx={{
                width: '90vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 4,
                backgroundColor: '#121212'
            }}
        >
            <Box>
                <CardListScrollable
                    cardList={notPreparedCards}
                    header={
                        <>
                            <Typography variant={"h5"}>Prepare Cards</Typography>
                            <Typography> Cards Unlocked: {allCards.length} </Typography>
                        </>

                    }
                    onClickButton={handleAddCard}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '6vh'
                }}
            >
                <Button variant={"contained"} onClick={handleSubmitSaveCards}>Save</Button>
            </Box>
            <Box>
                <CardListScrollable
                    cardList={currentPreparedCards}
                    header={
                        <>
                            <Typography variant={"h5"}>Cards Prepared</Typography>
                            <Typography>Card Slots: {currentPreparedCards.length} / {currentSheet.getCardSlots()} </Typography>
                        </>

                    }
                    onClickButton={handleRemoveCard}
                    isAdd={false}
                />
            </Box>
        </Box>

    ) : <></>
}

export default CardPreparationView