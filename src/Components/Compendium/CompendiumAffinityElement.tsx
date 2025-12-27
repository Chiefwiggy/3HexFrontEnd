import React, {useEffect, useState} from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import {IAffinities, IAffinitiesArray, IPathKeys} from "../../Data/ICharacterData";
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
import {disambiguateCard} from "../../Utils/DisambiguateCardType";

interface ICompendiumAffinityElementInput {
    elemName: keyof IAffinities | keyof IPathKeys | "_"
    isPath: boolean,
    description: string
}

const CompendiumAffinityElement = ({
   elemName,
   isPath,
   description
}: ICompendiumAffinityElementInput) => {

    const {PathData, AffinityData, isLoaded} = usePreloadedContent();

    const [allCards, setAllCards] = useState<Map<number, Array<ICommonCardData>>>();

    const [allAbilities, setAllAbilities] = useState<Map<number, Array<IAbility>>>();

    const [levelArray, setLevelArray] = useState<Array<number>>([]);

    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showAdd: false,
        showPrerequisites: true
    }

    useEffect(() => {
        if (isPath) {
            setAllCards(PathData.getPathCardsByLevel(elemName as keyof IPathKeys));
            setAllAbilities(PathData.getPathAbilitiesByLevel(elemName as keyof IPathKeys));
            setLevelArray(PathData.getLevelArray(elemName as keyof IPathKeys));
        } else {
            setAllCards(AffinityData.getAffinityCardsByLevel(elemName as keyof IAffinities));
            setAllAbilities(AffinityData.getAffinityAbilitiesByLevel(elemName as keyof IAffinities));
            setLevelArray(AffinityData.getLevelArray(elemName as keyof IAffinities));
            console.log(AffinityData.getAffinityCards("transduction"));
        }
    }, [elemName, isLoaded]);

    return isLoaded ? (
        <Box>
            <Typography variant={"h3"} component={"div"}>{capitalize(elemName)}</Typography>
            <Typography>{description}</Typography>
            {
                levelArray.map(e => {
                    return (
                        <Box key={e}>
                            <Typography variant={"h5"}>{capitalize(elemName)} {e}</Typography>

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                                    gridGap: "10px"
                                }}
                            >
                                {
                                    (allAbilities?.get(e) ?? []).map(ability => {
                                        return (
                                            <AbilityItem abilityData={ability} key={ability._id}
                                                         showPrerequisites={true}/>
                                        )
                                    })
                                }
                                {
                                    allCards ?
                                    disambiguateCard((allCards.get(e) ?? []), compendiumProps)
                                        : <></>
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