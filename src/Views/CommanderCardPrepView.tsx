import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import {ICommanderCardData, ICommonCardData} from "../Data/ICardData";
import {ICardSendbackData} from "../Layouts/GenericCardLayout";
import CardListScrollable from "../Components/Cards/CardListScrollable";
import useAPI from "../Hooks/useAPI/useAPI";

interface ICommanderCardPrepViewInput {
    closeSelf: (event: React.MouseEvent) => void;
}

const CommanderCardPrepView = ({
    closeSelf
}: ICommanderCardPrepViewInput) => {

    const {currentSheet} = useCharacter();
    const {CharacterAPI} = useAPI();

    const [allCards, setAllCards] = useState<Array<ICommonCardData>>([]);
    const [notPreparedCards, setNotPreparedCards] = useState<Array<ICommonCardData>>([]);
    const [currentPreparedCards, setCurrentPreparedCards] = useState<Array<ICommonCardData>>([])

    useEffect(() => {
        if (currentSheet) {
            const cards = currentSheet.commanderCards;
            setAllCards(cards);
            setCurrentPreparedCards(cards.filter(c => currentSheet.data.preparedCommanderCards.includes(c._id)));
            setNotPreparedCards(cards.filter(c => !(currentSheet.data.preparedCommanderCards.includes(c._id))));
        }
    }, []);

    const handleAddCard = (data: ICardSendbackData) => {
        setCurrentPreparedCards([...currentPreparedCards, data.cardData])
        setNotPreparedCards(notPreparedCards.filter((elem) => elem !== data.cardData));
    }

    const handleRemoveCard = (data: ICardSendbackData) => {
        setNotPreparedCards([...notPreparedCards, data.cardData])
        setCurrentPreparedCards(currentPreparedCards.filter((elem) => elem !== data.cardData));
    }

    const handleSubmitSaveCards = async (e: React.MouseEvent) => {
        const idsList: Array<string> = currentPreparedCards.map(e => e._id);
        console.log(idsList);
        if (currentSheet) {
            await CharacterAPI.SetPreparedCommanderCards(currentSheet?.data._id, idsList);
            currentSheet.setPreparedCommanderCards(idsList);
            closeSelf(e);
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
                    gridTemplate={"1fr"}
                    skeletonMax={5}
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
                            <Typography>Card Slots: {currentPreparedCards.length} / {currentSheet.getAuthoritySlots()} </Typography>
                        </>

                    }
                    onClickButton={handleRemoveCard}
                    isAdd={false}
                    gridTemplate={"1fr"}
                    skeletonMax={5}
                />
            </Box>
        </Box>

    ) : <></>
}

export default CommanderCardPrepView;