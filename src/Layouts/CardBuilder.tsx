import React, {useEffect, useState} from 'react'
import {Box, Button, Grid, Paper} from "@mui/material";
import {ICommonCardData, IConditionCard, IWeaponBaseData, IWeaponCommonData} from "../Data/ICardData";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import {SortCardList} from "../Utils/CardSorting";
import CardSkeleton from "../Components/Cards/CardSkeleton";
import {ICardSendbackData} from "./GenericCardLayout";
import CardBuilderGridList from "../Components/CardBuilder/CardBuilderGridList";
import AbstractCardCalculator from "../Data/Card Calculators/AbstractCardCalculator";
import CalculatedCard from "../Components/CardBuilder/CalculatedCard";
import cardConnection from "../Connections/CardConnection";
import useAPI from "../Hooks/useAPI/useAPI";
import usePreloadedContent from "../Hooks/usePreloadedContent/usePreloadedContent";
import CharacterSheet from "../Data/CharacterSheet";
import MinionSheet from "../Data/MinionSheet";
import AbstractSheet from "../Data/AbstractSheet";




export interface ICardBuilderType {
    name: Array<string>,
    display: string,
    component: Array<React.FC<any>>,
    required?: boolean,
    counterRequired?: boolean,
    counterInvalid?: boolean,
    count: number
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
    offhandData?: boolean,
    canSave?: boolean,
    canCounter: boolean,
    owner: AbstractSheet
}
const CardBuilder = ({
    GetAllCards,
    defaultCardList,
    cardTypes,
    cardCalculator,
    sendSaveData,
    sendEquipData,
    sendCounterData,
    offhandData = false,
    canSave = true,
    canCounter,
    owner
}: ICardBuilderInput) => {

    const [cardData, setCardData] = useState<Array<ICommonCardData|null>>(new Array(
        cardTypes.reduce((pv, cv) => { return pv + cv.count }, 0)
    ).fill(null));

    const { CharacterAPI } = useAPI();

    const { ConditionData } = usePreloadedContent();

    const sendSetCard = (cardIndex: number) => (data: ICardSendbackData) => {
        const newState = [...cardData];
        if (data.action == 'add') {
            let startingIndex = cardTypes.slice(0, cardIndex).reduce((pv, cv) => {
                return cv.count + pv;
            }, 0)
            let finalIndex = startingIndex + cardTypes[cardIndex].count;
            const openSpots = newState.slice(startingIndex, finalIndex).reduce((pv, cv) => {
                if (cv) return pv;
                return pv + 1;
            }, 0)
            if (openSpots) {
                newState[finalIndex-openSpots] = data.cardData
            } else {
                // newState[startingIndex]
                newState[finalIndex-1] = data.cardData;
            }
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
        await sendSaveData(cardData, <CalculatedCard
                        cardCalculator={cardCalculator}
                        depArray={cardData}
                        owner={owner}
                    />);
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
            let cards: Array<ICommonCardData> = [...defaultCardList, ...(await GetAllCards())];
            console.log(cards)
            if (offhandData) {
                cards = cards.filter(e => {
                    switch(e.cardSubtype) {
                        case "base":
                            return (e as IWeaponBaseData).handedness <= 1;
                        default:
                            return (e as IWeaponCommonData).canUseForOffhand
                    }
                })
            } else {
                cards = cards.filter(e => {
                    if (e.cardType == "weapon" && e.cardSubtype != "base") {
                        return !(e as IWeaponCommonData).offhandOnly
                    }
                    return true;
                })
            }
            // const conditions: Array<IConditionCard> = cardTypes[0].name[0].split(".")[0] === "weapon" ?  ConditionData.GetAttackConditions() : ConditionData.GetSpellConditions()
            setAllCards(Array.from(new Map(cards.map(item => [item._id, item])).values()).sort(SortCardList))
        })();
    }, []);

    useEffect(() => {
        if (currentFilter == null) {
            setCurrentCards(allCards.filter(card => card.cardType != "condition"));
        } else if (currentFilter == -1) {
            setCurrentCards([]);
        } else {
            setCurrentCards(allCards.filter((card) => {
                return card.cardSubtype == cardTypes[currentFilter].name[0].split(".")[1];
            }))
        }
    }, [allCards, currentFilter]);

    // const {currentSheet} = useCharacter();

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

        if (isCompleteLocal) {

            cardCalculator.sendCurrentCards(cardData, owner);
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
                    display: "grid",
                    gridTemplateColumns: "4fr 1fr",
                    alignItems: "start",
                    gridGap: "10px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            overflowX: "scroll",
                            scrollbarColor: '#6b6b6b #2b2b2b',
                            scrollbarWidth: 'thin',
                            '& > :not(style)': {
                                m: 1,
                                width: "16vw",
                                minHeight: 128,
                                textAlign: 'center',
                            },
                        }}
                    >
                        {
                            ((): any => {
                                let runningIndex = 0; // Initialize running index
                                return cardTypes.map((data) => {
                                    return Array.from({length: data.count}).map((_, i) => {
                                        const currentIndex = runningIndex++; // Use and increment the running index inline
                                        return (
                                            <CardSkeleton
                                                placeholderText={data.display.toUpperCase()}
                                                CardElement={data.component[data.name.findIndex(e => e.split('.')[1] === cardData[currentIndex]?.cardSubtype ?? 0)]}
                                                cardData={cardData[currentIndex]} // Access the correct index
                                                sendBack={sendSetCard(currentIndex)} // Use the correct index
                                                type={`${data.name[0]}.${cardData[currentIndex]?.cardSubtype}`}
                                                key={`${data.name[0]}-${i}`}
                                                index={i} // Pass the correct overall index
                                            />
                                        );
                                    });
                                });
                            })()
                        }

                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            padding: "12px"
                        }}
                    >
                        {
                            cardTypes.map((type, index) => {
                                return (
                                    <Button
                                        variant={currentFilter == index ? "contained" : "outlined"}
                                        onClick={handleFilterCards(index)}
                                        key={type.name[0]}
                                    >
                                        {type.display.toUpperCase()}
                                    </Button>
                                )
                            })
                        }
                    </Box>
                    <Box
                        sx={{
                            padding: "12px",
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <CardBuilderGridList
                            cardList={currentCards}
                            cardTypes={cardTypes}
                            sendBack={sendSetCard}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        maxHeight: "100vh",
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}
                >
                    <Box>
                        {
                            isComplete ?
                                <CalculatedCard
                                    cardCalculator={cardCalculator}
                                    depArray={cardData}
                                    owner={owner}
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
                            justifyContent: 'space-around',
                            flexDirection: "column",
                            gap: "12px"
                        }}
                    >

                        {
                            canSave ?
                                <Button
                                    variant={"contained"}
                                    color={"secondary"}
                                    onClick={handleSaveCard}
                                    disabled={!isComplete}
                                >
                                    Save
                                </Button>
                                :
                                <></>
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

                </Box>

            </Box>



        </Box>
    )
}

export default CardBuilder;