import React, {useEffect, useState} from 'react';
import {Box, Paper, Typography} from "@mui/material";
import {Casino, CasinoOutlined} from "@mui/icons-material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";

interface IExpertiseWidgetInput {

}

const ExpertiseWidget = ({}: IExpertiseWidgetInput) => {

    const [expertiseDice, setExpertiseDice] = useState(3);

    const {currentSheet} = useCharacter();

    useEffect(() => {
        if (currentSheet) {
            setExpertiseDice(currentSheet.getExpertiseDice)
        }
    }, [currentSheet]);


    return currentSheet ? (
        <Paper elevation={2}
            sx={{
                padding: "12px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: "4px"
                }}
            >
                <Typography>Expertise Dice: </Typography>
                {
                    Array.from({length: expertiseDice}).map((_, i) => {
                        return <CasinoOutlined key={i}/>
                    })
                }
            </Box>

        </Paper>
    ) : <></>
}

export default ExpertiseWidget