import SpellBaseCard from "../Components/Cards/SpellBaseCard";
import {
    ICommanderCardData, ICommonCardData, IConditionCard,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData, IWeaponBaseData
} from "../Data/ICardData";
import SpellTargetCard from "../Components/Cards/SpellTargetCard";
import SpellModifierCard from "../Components/Cards/SpellModifierCard";
import WeaponBaseCard from "../Components/Cards/WeaponBaseCard";
import WeaponModCard from "../Components/Cards/WeaponModCard";
import CommanderCard from "../Components/Cards/CommanderCard";
import React from "react";
import {ConstructFinalWeapon} from "./ConstructFinalWeapon";
import {Box} from "@mui/material";
import ConditionCard from "../Components/Cards/ConditionCard";
import SpellTargetSummonCard from "../Components/Cards/SpellTargetSummonCard";


export const disambiguateCard = (allCards: Array<ICommonCardData>, compendiumProps: Object) => {
    return allCards.map(card => {
        if (card.cardType == "spell") {
            switch (card.cardSubtype) {
                case "base":
                    return (<Box key = {card.cardName}><SpellBaseCard cardData = {card as ISpellBaseCardData}
                    sendBack = {()=>{} }
            {...
                compendiumProps
            }
            /></Box>)
        case
            "target"
        :
            return (<Box key = {card.cardName}><SpellTargetCard cardData = {card as ISpellTargetCardData}
            sendBack = {()=>{} }
            {...
                compendiumProps
            }
            /></Box>)
        case
            "summon"
        :
            return (<Box key = {card.cardName}><SpellTargetSummonCard cardData = {card as ISpellTargetCardData}
            sendBack = {()=>{} }
            {...
                compendiumProps
            }
            /></Box>)
        default:
            return (<Box key = {card.cardName}><SpellModifierCard cardData = {card as ISpellModifierCardData}

            sendBack = {()=>{} }
            {...
                compendiumProps
            }
            /></Box>)

        }
        } else if (card.cardType == "weapon") {
            if (card.cardSubtype == "base") {
                return (<Box key = {card.cardName}><WeaponBaseCard cardData = {card as IWeaponBaseData} enchantmentData={0}
                sendBack = {()=>{} }
                {...
                    compendiumProps
                }
                /></Box>)
            } else {
                return (<Box key = {card.cardName}><WeaponModCard cardData = {card}
                sendBack = {()=>{} }
                {...
                    compendiumProps
                }
                /></Box>)
            }
        } else if (card.cardType == "commander") {
            return (<Box key={card.cardName}><CommanderCard cardData={card as ICommanderCardData}
                                                            sendBack={() => {
                                                            }}
                                                            key={card.cardName}
                                                            {...
                                                                compendiumProps
                                                            }
            /></Box>)
        } else if (card.cardType == "condition") {
            return (
                <Box key={card.cardName}>
                    <ConditionCard
                        cardData={card as IConditionCard}
                        sendBack={() => {}}
                        key={card.cardName}
                        {...
                            compendiumProps
                        }
                    />
                </Box>
            )
        } else {
            return <>test</>
        }
    })
}