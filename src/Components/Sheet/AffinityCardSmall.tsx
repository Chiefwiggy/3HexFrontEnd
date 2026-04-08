import React from 'react';
import {Box, Typography} from "@mui/material";
import {UAffinity, UPath} from "../../Data/ICardData";
import {IAffinitiesAndPath} from "../../Data/ICharacterData";


interface IAffinityCardSmallInput {
    path: UPath,
    affinities: Array<UAffinity>
    affData: IAffinitiesAndPath;
}

const AffinityCardSmall = ({path, affinities, affData}: IAffinityCardSmallInput) => {
    return affData.path[path] > 0 ? (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "11fr 1fr",
                mb: 1
            }}
        >
            <Box>
                <Typography variant="h6" component="div" textAlign={"center"}>{path.toUpperCase()}</Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "3fr 1fr 3fr 1fr 3fr 1fr"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >

                        <Typography variant={"h6"}>{affData.affinities[affinities[0]]}</Typography>
                        <Typography sx={{fontSize: "13px"}}>{affinities[0].toUpperCase()}</Typography>
                    </Box>
                    <Typography variant={"h4"} sx={{color: "grey", textAlign: "center"}}>+</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >

                        <Typography variant={"h6"}>{affData.affinities[affinities[1]]}</Typography>
                        <Typography sx={{fontSize: "13px"}}>{affinities[1].toUpperCase()}</Typography>
                    </Box>
                    <Typography variant={"h4"} sx={{color: "grey", textAlign: "center"}}>+</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >

                        <Typography variant={"h6"}>{affData.affinities[affinities[2]]}</Typography>
                        <Typography sx={{fontSize: "13px"}}>{affinities[2].toUpperCase()}</Typography>
                    </Box>
                    <Typography variant={"h4"} sx={{color: "grey", textAlign: "center"}}>=</Typography>

                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2.4
                }}
            >
                <Typography variant={"h6"}>{affData.path[path]}</Typography>
            </Box>

        </Box>
    ) : (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "11fr 1fr",
                mb: 2
            }}
        >
            <Box>
                <Typography variant="h6" color="grey" textAlign={"center"}>{path.toUpperCase()}</Typography>
            </Box>
            <Typography variant={"h6"} color={"grey"}>0</Typography>
        </Box>
    )
}

export default AffinityCardSmall