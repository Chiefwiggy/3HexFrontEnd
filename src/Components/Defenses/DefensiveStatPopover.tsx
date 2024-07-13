import React from 'react'
import {Box, Typography} from "@mui/material";
import {IDefenseBreakdown} from "../../Data/IDefenses";

interface IDefensiveStatPopoverInput {
    breakdown: IDefenseBreakdown
}
const DefensiveStatPopover = ({
    breakdown
}: IDefensiveStatPopoverInput) => {

    return (
        <Box
            sx={{
                padding: '24px'
            }}
        >
            <Typography variant={"h6"}> Total Value: {breakdown.totalValue}</Typography>
            <Box
                sx={{
                    paddingLeft: "20px"
                }}
            >
                {
                    breakdown.sources.map((source) => {
                        return <Typography
                            key={source.reason}
                            sx={{
                                textAlign: "right"
                            }}
                        >
                            {source.reason}: {source.value}
                        </Typography>
                    })
                }
            </Box>

        </Box>
    )

}

export default DefensiveStatPopover;