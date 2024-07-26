import React, {useEffect, useState} from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import {IAffinities, IAffinitiesArray, IArcanaKeys} from "../../Data/ICharacterData";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {
    ICommanderCardData,
    ICommonCardData, IScaledWeaponBaseData,
    ISpellBaseCardData,
    ISpellModifierCardData,
    ISpellTargetCardData,
    IWeaponBaseData
} from "../../Data/ICardData";
import {IAbility} from "../../Data/IAbilities";
import AbilityItem from "../Abilities/AbilityItem";
import SpellBaseCard from "../Cards/SpellBaseCard";
import SpellTargetCard from "../Cards/SpellTargetCard";
import SpellModifierCard from "../Cards/SpellModifierCard";
import WeaponBaseCard from "../Cards/WeaponBaseCard";
import WeaponModCard from "../Cards/WeaponModCard";
import CommanderCard from "../Cards/CommanderCard";

interface ICompendiumAffinityElementInput {
    elemName: keyof IAffinities | keyof IArcanaKeys | "_"
    isArcana: boolean,
    description: string
}

const CompendiumAffinityElement = ({
   elemName,
   isArcana,
   description
}: ICompendiumAffinityElementInput) => {

    const {ArcanaData, AffinityData, isLoaded} = usePreloadedContent();

    const [allCards, setAllCards] = useState<Map<number, Array<ICommonCardData>>>();

    const [allAbilities, setAllAbilities] = useState<Map<number, Array<IAbility>>>();

    const [levelArray, setLevelArray] = useState<Array<number>>([]);

    const compendiumProps = {
        isExpanded: true,
        canToggleExpand: false,
        canFavorite: false,
        isAdd: true,
        showPrerequisites: true
    }

    useEffect(() => {
        if (isArcana) {
            setAllCards(ArcanaData.getArcanaCardsByLevel(elemName as keyof IArcanaKeys));
            setAllAbilities(ArcanaData.getArcanaAbilitiesByLevel(elemName as keyof IArcanaKeys));
            setLevelArray(ArcanaData.getLevelArray(elemName as keyof IArcanaKeys));
        } else {
            setAllCards(AffinityData.getAffinityCardsByLevel(elemName as keyof IAffinities));
            setAllAbilities(AffinityData.getAffinityAbilitiesByLevel(elemName as keyof IAffinities));
            setLevelArray(AffinityData.getLevelArray(elemName as keyof IAffinities));
        }
    }, [elemName, isLoaded]);

    // useEffect(() => {
    //
    // }, [allCards]);

    return isLoaded ? (
        <Box>
            <Typography variant={"h3"} component={"div"}>{capitalize(elemName)}</Typography>
            <Typography>{description}</Typography>
            {
                levelArray.map(e => {
                    return (
                        <Box key={e}>
                            <Typography variant={"h5"}>{capitalize(elemName)} {e}</Typography>
                            {
                                (allAbilities?.get(e) ?? []).map(ability => {
                                    return (
                                        <AbilityItem abilityData={ability} key={ability.abilityName}
                                                     showPrerequisites={true}/>
                                    )
                                })
                            }
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(5, 1fr)"
                                }}
                            >
                                {
                                    (allCards?.get(e) ?? []).map(card => {
                                        if (card.cardType == "spell") {
                                            switch (card.cardSubtype) {
                                                case "base":
                                                    return <SpellBaseCard cardData={card as ISpellBaseCardData}
                                                                          key={card.cardName} sendBack={() => {
                                                    }} {...compendiumProps}/>
                                                case "target":
                                                    return <SpellTargetCard cardData={card as ISpellTargetCardData}
                                                                            key={card.cardName} sendBack={() => {
                                                    }} {...compendiumProps} />
                                                default:
                                                    return <SpellModifierCard cardData={card as ISpellModifierCardData}
                                                                              key={card.cardName} sendBack={() => {
                                                    }} {...compendiumProps} />

                                            }
                                        } else if (card.cardType == "weapon") {
                                            if (card.cardSubtype == "base") {
                                                return <WeaponBaseCard cardData={card as IScaledWeaponBaseData}
                                                                       key={card.cardName} sendBack={() => {
                                                }} {...compendiumProps} />
                                            } else {
                                                return <WeaponModCard cardData={card} sendBack={() => {
                                                }} key={card.cardName}  {...compendiumProps} />
                                            }
                                        } else if (card.cardType == "commander") {
                                            return <CommanderCard cardData={card as ICommanderCardData}
                                                                  sendBack={() => {
                                                                  }} key={card.cardName} {...compendiumProps}/>

                                        } else {
                                            return <>test</>
                                        }
                                    })
                                }
                            </Box>

                        </Box>

                    )
                })
            }
        </Box>
    ) : <></>
}

export default CompendiumAffinityElement