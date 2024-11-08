import React, {useEffect, useState} from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import useCharacter from "../../../Hooks/useCharacter/useCharacter";
import {IAffinities, IAffinitiesAndPath, IPathKeys, IClassData} from "../../../Data/ICharacterData";
import {IFatelineData} from "../../../Data/IFatelineData";
import {GetPathAndAffinitiesFromClassList} from "../../../Utils/CalculateAffinities";

interface IPathLayoutInput {
    path: string,
    affinities: Array<string>,
    affData: IAffinitiesAndPath
}

const PathLayout = ({
    path,
    affinities,
    affData
}: IPathLayoutInput) => {



    return (
        <Box
                sx={{
                    padding: 2
                }}
            >
                <Typography textAlign="right" variant={"h5"}>{capitalize(path)}: {affData.path[path as keyof IPathKeys]}</Typography>
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

export default PathLayout