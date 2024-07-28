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
        isExpanded: true,
        canToggleExpand: false,
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
                allAbilities.map(ability => {
                    return (
                        <AbilityItem abilityData={ability} key={ability.abilityName} showPrerequisites={true}/>
                    )
                })
            }
            <Typography variant={"h4"}> Class Cards </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)"
                }}
            >
                {
                    allCards.map(card => {
                        if (card.cardType == "spell") {
                            switch (card.cardSubtype) {
                                case "base":
                                    return <SpellBaseCard cardData={card as ISpellBaseCardData}  key={card.cardName} sendBack={() => {}} {...compendiumProps}/>
                                case "target":
                                    return <SpellTargetCard cardData={card as ISpellTargetCardData} key={card.cardName}  sendBack={() => {}} {...compendiumProps} />
                                default:
                                    return <SpellModifierCard cardData={card as ISpellModifierCardData} key={card.cardName}  sendBack={() => {}} {...compendiumProps} />

                            }
                        } else if (card.cardType == "weapon") {
                            if (card.cardSubtype == "base") {
                                return <WeaponBaseCard cardData={ConstructFinalWeapon(card as IWeaponBaseData, 0)}  key={card.cardName} sendBack={() => {}} {...compendiumProps} />
                            } else {
                                return <WeaponModCard cardData={card} sendBack={() => {}} key={card.cardName}  {...compendiumProps} />
                            }
                        } else if (card.cardType == "commander") {
                            return <CommanderCard cardData={card as ICommanderCardData} sendBack={()=>{}} key={card.cardName} {...compendiumProps}/>

                        } else {
                            return <>test</>
                        }
                    })
                }
            </Box>

        </Box>
    )
}

export default CompendiumClassElement