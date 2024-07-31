import React, {useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {IClassMetaData} from "../../Data/IClassMetaData";
import useAPI from "../../Hooks/useAPI/useAPI";
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
import WeaponModCard from "../Cards/WeaponModCard";
import WeaponBaseCard from "../Cards/WeaponBaseCard";
import SpellBaseCard from "../Cards/SpellBaseCard";
import SpellTargetCard from "../Cards/SpellTargetCard";
import SpellModifierCard from "../Cards/SpellModifierCard";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent"
import CommanderCard from '../Cards/CommanderCard'
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";
import {disambiguateCard} from "../../Utils/DisambiguateCardType";

interface ICompendiumClassElementInput {
    data: IClassMetaData
}

const CompendiumClassElement = ({
    data
}: ICompendiumClassElementInput) => {

    const {ClassData, isLoaded} = usePreloadedContent();

    const [allCards, setAllCards] = useState<Array<ICommonCardData>>([]);
    const [allAbilities, setAllAbilities] = useState<Array<IAbility>>([]);

    useEffect(() => {
        setAllCards(ClassData.getClassCards(data.className.toLowerCase()));
        setAllAbilities(ClassData.getClassAbilities(data.className.toLowerCase()));
    }, [data, isLoaded]);

    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showPrerequisites: true
    }

    return (
        <Box>
            <Typography variant="h3" component="div">{data.className}</Typography>
            <Typography variant={"body2"}>{data.description}</Typography>
            <Typography variant={"h4"}> Class Abilities </Typography>
            {
                allAbilities.map((ability,index) => {
                    return <AbilityItem abilityData={ability} showPrerequisites={true} key={index} />

                })
            }
            <Typography variant={"h4"}> Class Cards </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                    gridGap: "10px"
                }}
            >
                {
                    disambiguateCard(allCards, compendiumProps)
                }
            </Box>

        </Box>
    )
}

export default CompendiumClassElement