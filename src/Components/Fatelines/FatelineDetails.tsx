import React, {useEffect, useState} from 'react';
import {Box, Paper, Typography} from "@mui/material";
import {IFatelineFullData} from "../../Data/IFatelineData";
import CompendiumChoiceAffinities from "../ClassSelect/Affinities/CompendiumChoiceAffinities";
import AbilityItem from "../Abilities/AbilityItem";
import {disambiguateCard} from "../../Utils/DisambiguateCardType";

interface IFatelineDetailsInput {
    fateline: IFatelineFullData,
    reversed: boolean
}

const FatelineDetails = ({fateline, reversed}: IFatelineDetailsInput) => {

    const [fatelineData, setFatelineData] = useState(fateline.upright);

    useEffect(() => {
        if (reversed) {
            setFatelineData(fateline.reversed);
        } else {
            setFatelineData(fateline.upright);
        }
    }, [fateline, reversed]);

    const compendiumProps = {
        isExpanded: false,
        canToggleExpand: true,
        canFavorite: false,
        isAdd: true,
        showPrerequisites: true
    }

    return (
        <Paper
            elevation={0}
            sx={{
                padding: "12px",
                width: "100%"
            }}
        >
            <Box>
                <Typography variant={"h4"}>{fateline.fatelineName}, {reversed ? "Reversed" : "Upright"}</Typography>
                <Typography variant={"body1"}>{fatelineData.fatelineDescription}</Typography>
            </Box>
            <br />
            <Box>
                <Typography variant={"h5"}>Affinities</Typography>
                {
                    fatelineData.affinityChoices.choices.length > 0 ?
                        <CompendiumChoiceAffinities choiceData={fatelineData.affinityChoices}/>
                        :
                        <Typography>None</Typography>
                }

            </Box>
            <Typography variant={"h5"}> Unlocks </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: "repeat( auto-fill , max(264px, 19vw))",
                    gridGap: "10px"
                }}
            >
                {
                    fatelineData.abilities.map((ability, index) => {
                        return <AbilityItem abilityData={ability} showPrerequisites={true} key={index}/>
                    })
                }
                {
                    disambiguateCard(fatelineData.cards, compendiumProps)
                }

            </Box>

        </Paper>
    )
}

export default FatelineDetails