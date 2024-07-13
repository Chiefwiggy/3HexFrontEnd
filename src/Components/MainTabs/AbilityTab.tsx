import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import useAPI from "../../Hooks/useAPI/useAPI";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {IAbility} from "../../Data/IAbilities";
import AbilityItem from "../Abilities/AbilityItem";

interface IAbilityTabInput {

}

const AbilityTab = ({

}: IAbilityTabInput) => {

    const {currentSheet, savePing} = useCharacter();


    return currentSheet ? (
        <Box>
            {currentSheet.allAbilities.map(ability => {
                return (
                    <AbilityItem abilityData={ability} key={ability._id}  />
                )
            })}
        </Box>
    ) : <></>
}

export default AbilityTab