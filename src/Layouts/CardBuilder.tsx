import React, {useEffect, useState} from 'react'
import {Box, Button, Grid, Paper} from "@mui/material";
import {ICommonCardData} from "../Data/ICardData";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import {SortCardList} from "../Utils/CardSorting";
import CardSkeleton from "../Components/Cards/CardSkeleton";
import {ICardSendbackData} from "./GenericCardLayout";
import CardBuilderGridList from "../Components/CardBuilder/CardBuilderGridList";
import AbstractCardCalculator from "../Data/Card Calculators/AbstractCardCalculator";
import CalculatedCard from "../Components/CardBuilder/CalculatedCard";
import cardConnection from "../Connections/CardConnection";
import useAPI from "../Hooks/useAPI/useAPI";




export interface ICardBuilderType {
    name: string,
    display: string,
    component: React.FC<any>,
    required?: boolean,
    counterRequired?: boolean,
    counterInvalid?: boolean
}
interface ICardBuilderInput {
    GetAllCards: () => Promise<Array<ICommonCardData>>
    defaultCardList: Array<ICommonCardData>,
    cardTypes: Array<ICardBuilderType>,
    cardCalculator: AbstractCardCalculator,
    closeSelf: (event: any) => void
    sendSaveData: (cards: Array<ICommonCardData|null>, spellCopy: React.ReactNode) => Promise<void>,
    sendEquipData: (cards: Array<ICommonCardData|null>) => Promise<void>
    sendCounterData: (cards: Array<ICommonCardData|null>) => Promise<void>
    canCounter: boolean
}
const CardBuilder = ({
    GetAllCards,
    defaultCardList,
    cardTypes,
    cardCalculator,
    closeSelf,
    sendSaveData,
    sendEquipData,
    sendCounterData,
    canCounter
}: ICardBuilderInput) => {

    const [cardData, setCardData] = useState<Array<ICommonCardData|null>>(new Array(cardTypes.length).fill(null));

    const { CharacterAPI } = useAPI();

    const sendSetCard = (cardIndex: number) => (data: ICardSendbackData) => {
        const newState = [...cardData];
        if (data.action == 'add') {
            newState[cardIndex] = data.cardData;
        } else {
            newState[cardIndex] = null;
        }
        setCardData(newState);
    }

    const handleFilterCards = (cardIndex: number) => (event: React.MouseEvent) => {
        if (currentFilter == cardIndex) setCurrentFilter(null)
        else setCurrentFilter(cardIndex);
    }

    const handleCreateCard = async(event: React.MouseEvent) => {
        await sendEquipData(cardData)
    }

    const handleSaveCard = async(event: React.MouseEvent): Promise<void> => {
        if (currentSheet) {
            await sendSaveData(cardData, <CalculatedCard
                            cardCalculator={cardCalculator}
                            depArray={cardData}
                            owner={currentSheet}
                        />);
        }

    }

    const handleCounterCard = async(event:React.MouseEvent): Promise<void> => {
        await sendCounterData(cardData)
    }

    const [currentFilter, setCurrentFilter] = useState<number|null>(null);

    const [allCards, setAllCards] = useState<Array<ICommonCardData>>([]);

    const [currentCards, setCurrentCards] = useState<Array<ICommonCardData>>([]);

    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isCounterValid, setIsCounterValid] = useState<boolean>(false);

    useEffect(() => {
        (async() => {
            const cards: Array<ICommonCardData> = await GetAllCards();
            setAllCards([...defaultCardList, ...cards].sort(SortCardList));
        })();
    }, []);

    useEffect(() => {
        if (currentFilter == null) {
            setCurrentCards(allCards);
        } else if (currentFilter == -1) {
            setCurrentCards([]);
        } else {
            setCurrentCards(allCards.filter((card) => {
                return card.cardSubtype == cardTypes[currentFilter].name.split(".")[1];
            }))
        }
    }, [allCards, currentFilter]);

    const {currentSheet} = useCharacter();

    useEffect(() => {
        const isCompleteLocal = cardTypes.reduce((previousValue, currentValue, currentIndex) => {
            if (!previousValue) return false;
            if (currentValue.required && cardData[currentIndex] == null) {
                return false;
            }
            return previousValue;
        }, true);
        if (canCounter) {
            const isCounterValidLocal = cardTypes.reduce((previousValue, currentValue, currentIndex) => {
                if (!previousValue) return false;
                if (currentValue.counterRequired && cardData[currentIndex] == null) {
                    return false;
                } else if (currentValue.counterInvalid && cardData[currentIndex] != null) {
                    return false;
                }
                return previousValue;

            }, true);
            setIsCounterValid(isCounterValidLocal);
        }

        if (isCompleteLocal && currentSheet) {
            cardCalculator.sendCurrentCards(cardData, currentSheet.data);
        }
        setIsComplete(isCompleteLocal);

    }, [cardData, cardTypes])

    return (
        <Box
            sx={{
                width: "90vw",
                backgroundColor: "#121212",
                height: "100vh"
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                         m: 1,
                        width: "16vw",
                        minHeight: 128,
                        textAlign: 'center',
                    },
                  }}
            >
                {
                    cardTypes.map((data, index) => {
                        return (
                            <CardSkeleton
                                placeholderText={data.display.toUpperCase()}
                                CardElement={data.component}
                                cardData={cardData[index]}
                                sendBack={sendSetCard(index)}
                                type={data.name}
                                key={data.name}
                            />
                        )
                    })
                }
                {
                    isComplete && currentSheet ?
                        <CalculatedCard
                            cardCalculator={cardCalculator}
                            depArray={cardData}
                            owner={currentSheet}
                        />
                        :
                        <Paper elevation={1} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}>
                            Card is incomplete.
                        </Paper>
                }
            </Box>
            <Box
                sx={{
                    padding: "12px",
                    display: 'flex',
                    justifyContent: 'space-around'
                }}
            >
                {
                    cardTypes.map((type, index) => {
                        return (
                            <Button
                                variant={currentFilter == index ? "contained" : "outlined"}
                                onClick={handleFilterCards(index)}
                                key={type.name}
                            >
                                {type.display.toUpperCase()}
                            </Button>
                        )
                    })
                }
                <Button
                    variant={"contained"}
                    color={"secondary"}
                    onClick={handleSaveCard}
                    disabled={!isComplete}
                >
                    Save
                </Button>
                {
                    canCounter ?
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            onClick={handleCounterCard}
                            disabled={!isCounterValid}
                        >
                            Counter
                        </Button>
                        :<></>
                }

                <Button
                    variant={"contained"}
                    color={"secondary"}
                    onClick={handleCreateCard}
                    disabled={!isComplete}
                >
                    Equip
                </Button>
            </Box>
            <Box
                sx={{
                    padding: "12px",
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Grid container spacing={2} justifyContent={"center"}>
                    <CardBuilderGridList
                        cardList={currentCards}
                        cardTypes={cardTypes}
                        sendBack={sendSetCard}
                    />
                </Grid>
            </Box>
        </Box>
    )
}

export default CardBuilder;