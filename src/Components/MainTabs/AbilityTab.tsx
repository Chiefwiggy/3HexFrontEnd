import React, {useEffect, useState} from 'react';
import {Box, Paper, Switch, Typography} from "@mui/material";
import useAPI from "../../Hooks/useAPI/useAPI";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {IAbility} from "../../Data/IAbilities";
import AbilityItem from "../Abilities/AbilityItem";

interface IAbilityTabInput {

}

const AbilityTab = ({

}: IAbilityTabInput) => {

    const {currentSheet, savePing} = useCharacter();

    const [showHidden, setShowHidden] = useState<boolean>(false);

    const [showPrereqs, setShowPrereqs] = useState<boolean>(false);

    const handleSwitch = () => {
        setShowHidden(!showHidden);
    }

    const handlePrereq = () => {
        setShowPrereqs(!showPrereqs);
    }


    return currentSheet ? (
        <Box>
            <Paper
                elevation={1}
                sx={{
                    marginBottom: "4px",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around"
                }}
            >
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
                    <Typography>Show Hidden Abilities? </Typography>
                    <Switch size={"small"} checked={showHidden} onChange={handleSwitch}/>
                </Box>
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
                    <Typography>Show Prerequisites? </Typography>
                    <Switch size={"small"} checked={showPrereqs} onChange={handlePrereq}/>
                </Box>
            </Paper>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                    gridGap: "10px"
                }}
            >

                {currentSheet.allAbilities.filter((a) => showHidden ? true : a.showByDefault).map(ability => {
                    return (
                        <AbilityItem abilityData={ability} key={ability._id} showPrerequisites={showPrereqs} />
                    )
                })}
            </Box>
        </Box>

    ) : <></>
}

export default AbilityTab