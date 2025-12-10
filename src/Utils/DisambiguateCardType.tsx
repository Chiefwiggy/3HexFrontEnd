import React from "react";
import { Box } from "@mui/material";

import SpellBaseCard from "../Components/Cards/SpellBaseCard";
import SpellTargetCard from "../Components/Cards/SpellTargetCard";
import SpellModifierCard from "../Components/Cards/SpellModifierCard";
import SpellTargetSummonCard from "../Components/Cards/SpellTargetSummonCard";
import WeaponBaseCard from "../Components/Cards/WeaponBaseCard";
import WeaponModCard from "../Components/Cards/WeaponModCard";
import CommanderCard from "../Components/Cards/CommanderCard";
import ConditionCard from "../Components/Cards/ConditionCard";

import {
    ICommanderCardData,
    ICommonCardData,
    IConditionCard, IHackBaseCardData, IHackIOCardData, IHackModifierCardData,
    IHackProtocolCardData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData,
} from "../Data/ICardData";
import HackBaseCard from "../Components/Cards/HackBaseCard";
import HackIOCard from "../Components/Cards/HackIOCard";
import HackProtocolCard from "../Components/Cards/HackProtocolCard";
import HackModifierCard from "../Components/Cards/HackModifierCard";

type DisambiguateOptions = {
    wrapper?: (element: JSX.Element, key: string) => JSX.Element;
};

export const disambiguateCard = (
    allCards: ICommonCardData[],
    compendiumProps: object,
    options: DisambiguateOptions = {}
): JSX.Element[] => {
    const { wrapper = (el, key) => <Box key={key}>{el}</Box> } = options;

    return allCards.map((card) => {
        const key = card._id;

        if (card.cardType === "spell") {
            switch (card.cardSubtype) {
                case "base":
                    return wrapper(
                        <SpellBaseCard
                            cardData={card as ISpellBaseCardData}
                            sendBack={() => {}}
                            {...compendiumProps}
                        />,
                        key
                    );
                case "target":
                    return wrapper(
                        <SpellTargetCard
                            cardData={card as ISpellTargetCardData}
                            sendBack={() => {}}
                            {...compendiumProps}
                        />,
                        key
                    );
                case "summon":
                    return wrapper(
                        <SpellTargetSummonCard
                            cardData={card as ISpellTargetCardData}
                            sendBack={() => {}}
                            {...compendiumProps}
                        />,
                        key
                    );
                default:
                    return wrapper(
                        <SpellModifierCard
                            cardData={card as ISpellModifierCardData}
                            sendBack={() => {}}
                            {...compendiumProps}
                        />,
                        key
                    );
            }
        }

        if (card.cardType === "weapon") {
            if (card.cardSubtype === "base") {
                return wrapper(
                    <WeaponBaseCard
                        cardData={card as IWeaponBaseData}
                        enchantmentData={{ enchantmentLevel: 0, baseId: "" }}
                        sendBack={() => {}}
                        {...compendiumProps}
                    />,
                    key
                );
            } else {
                return wrapper(
                    <WeaponModCard
                        cardData={card}
                        sendBack={() => {}}
                        {...compendiumProps}
                    />,
                    key
                );
            }
        }

        if (card.cardType == "hack") {
            switch(card.cardSubtype) {
                case "base":
                case "function":
                    return wrapper(
                        <HackBaseCard
                            cardData={card as IHackBaseCardData}
                            sendBack={() => {}}
                            {...compendiumProps}
                        />,
                        key
                    )
                case "io":
                    return wrapper(
                        <HackIOCard
                            cardData={card as IHackIOCardData}
                            sendBack={() => {}}
                            {...compendiumProps}
                        />,
                        key
                    )
                case "protocol":
                    return wrapper(
                        <HackProtocolCard
                            cardData={card as IHackProtocolCardData}
                            sendBack={() => {}}
                            {...compendiumProps}
                        />,
                        key
                    )
                default:
                    return wrapper(
                        <HackModifierCard
                            cardData={card as IHackModifierCardData}
                            sendBack={() => {}}
                            {...compendiumProps}
                        />,
                        key
                    )
            }
        }

        if (card.cardType === "commander") {
            return wrapper(
                <CommanderCard
                    cardData={card as ICommanderCardData}
                    sendBack={() => {}}
                    {...compendiumProps}
                />,
                key
            );
        }

        if (card.cardType === "condition") {
            return wrapper(
                <ConditionCard
                    cardData={card as IConditionCard}
                    sendBack={() => {}}
                    {...compendiumProps}
                />,
                key
            );
        }

        return wrapper(<>{card.cardName} (Unknown)</>, key);
    });
};
