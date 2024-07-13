import React, {useEffect, useState} from 'react';
import {Box, capitalize, Typography} from "@mui/material";
import useCharacter from "../../../Hooks/useCharacter/useCharacter";
import {IAffinities, IArcanaKeys, IClassData} from "../../../Data/ICharacterData";

interface IArcanaLayoutInput {
    arcana: string,
    affinities: Array<string>,
    myClasses: Array<IClassData>
}

const ArcanaLayout = ({
    arcana,
    affinities,
    myClasses
}: IArcanaLayoutInput) => {

    const {currentSheet} = useCharacter();

    const [affData, setAffData] = useState({
        affinities: {
            hex: 0,
            rune: 0,
            soul: 0,
            deft: 0,
            infantry: 0,
            guardian: 0,
            leadership: 0,
            erudite: 0,
            supply: 0,
            biohacking: 0,
            abjuration: 0,
            machinery: 0
        },
        arcana: {
            arcane: 0,
            warrior: 0,
            support: 0,
            hacker: 0
        }
    })

    useEffect(() => {
        if (currentSheet) {
            setAffData(currentSheet.getArcanaAndAffinitiesFromClassList(myClasses));
        }
    }, [myClasses]);

    return currentSheet ? (
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
    ) : <></>
}

export default ArcanaLayout