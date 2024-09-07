import React, {useEffect, useState} from 'react';
import {Box, capitalize, Paper, Typography} from "@mui/material";
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
import MultiselectChoice from "../ClassSelect/ChoiceElements/MultiselectChoice";
import AffinityCheckbox from "../ClassSelect/ChoiceElements/AffinityCheckbox";
import CompendiumChoiceAffinities from '../ClassSelect/Affinities/CompendiumChoiceAffinities'

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
        if (data) {
            setAllCards(ClassData.getClassCards(data.className.toLowerCase()));
            setAllAbilities(ClassData.getClassAbilities(data.className.toLowerCase()));
        }
    }, [data, isLoaded]);

    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showPrerequisites: true
    }

    return data ? (
        <Box>
            <Typography variant="h3" component="div">{data.className}</Typography>
            <Typography variant={"body2"}>{data.description}</Typography>
            <Typography variant={"h5"}>Skill Specialties</Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: "10px"
                }}
            >
                {
                    data.classExpertises.map(spec => {
                      return (
                          <Paper
                            sx={{
                                padding: "12px"
                            }}
                            elevation={1}
                          >
                              {capitalize(spec)}
                          </Paper>
                      )
                    })
                }
            </Box>

            <Typography variant={"h5"}> Standard Affinities</Typography>
            <Typography variant={"subtitle2"}>Choose {data.choices.baseChoice.amount}</Typography>
            <CompendiumChoiceAffinities choiceData={data.choices.baseChoice}/>
            <Typography variant={"h5"}> Prestige Affinities </Typography>
            <Typography variant={"subtitle2"}>Choose {data.choices.prestigeChoice.amount}</Typography>
            <CompendiumChoiceAffinities choiceData={data.choices.prestigeChoice}/>
            <Typography variant={"h4"}> Unlocks </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                    gridGap: "10px"
                }}
            >
                {
                    allAbilities.map((ability, index) => {
                        return <AbilityItem abilityData={ability} showPrerequisites={true} key={index}/>
                    })
                }
                {
                    disambiguateCard(allCards, compendiumProps)
                }

            </Box>

        </Box>
    ) : <></>
}

export default CompendiumClassElement