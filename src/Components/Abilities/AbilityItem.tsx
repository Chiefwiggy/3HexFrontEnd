import React, {useEffect} from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import {IAbility} from "../../Data/IAbilities";

interface IAbilityItemInput {
    abilityData: IAbility,
    showPrerequisites?: boolean
}

const AbilityItem = ({abilityData, showPrerequisites = false}: IAbilityItemInput) => {

    const [prereqString, setPrereqString] = React.useState<string>("None.")

    useEffect(() => {
        const str = abilityData.prerequisites.map(prereq => {
            return `${capitalize(prereq.skill)} ${prereq.level}`
        }).join(", ");
        if (str != "") {
            setPrereqString(str);
        }
    }, []);

    return (
        <Box>
            <Typography variant={"h5"}>{abilityData.abilityName}</Typography>
            {
                showPrerequisites ?
                    <Typography
                        variant={"body2"}
                        sx={{
                            color: "darkgray",
                            fontSize: "12px"
                        }}
                    >
                        Requirements: {prereqString}
                    </Typography>
                    : <></>
            }
            {
                abilityData.description.map((desc, index) => {
                    return <Typography variant={"body2"} key={index}>{desc}</Typography>
                })
            }
        </Box>
    )
}

export default AbilityItem