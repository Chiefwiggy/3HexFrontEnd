import React, {useEffect, useState} from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import useCharacter from "../../../Hooks/useCharacter/useCharacter";
import {IAffinities, IAffinitiesAndArcana, IArcanaKeys, IClassData} from "../../../Data/ICharacterData";
import {IFatelineData} from "../../../Data/IFatelineData";
import {GetArcanaAndAffinitiesFromClassList} from "../../../Utils/CalculateAffinities";

interface IArcanaLayoutInput {
    arcana: string,
    affinities: Array<string>,
    affData: IAffinitiesAndArcana
}

const ArcanaLayout = ({
    arcana,
    affinities,
    affData
}: IArcanaLayoutInput) => {



    return (
        <Box
                sx={{
                    padding: 2
                }}
            >
                <Typography textAlign="right" variant={"h5"}>{capitalize(arcana)}: {affData.arcana[arcana as keyof IArcanaKeys]}</Typography>
                {
                    affinities.map(aff => {
                        return (
                            <Typography textAlign="right" variant={"body2"} key={aff}>
                                {capitalize(aff)}: {affData.affinities[aff as keyof IAffinities]}
                            </Typography>
                        )
                    })
                }
            </Box>
    )
}

export default ArcanaLayout