import React, {useEffect, useState} from 'react'
import {IEffectData} from "../../Data/ICardData";
import {Box, Paper, Typography} from "@mui/material";
import {
    AutoFixHighOutlined, DirectionsRunOutlined,
    InfoOutlined, PriorityHigh, PriorityHighOutlined,
    ReportGmailerrorredOutlined,
    SportsMmaOutlined, SquareOutlined,
    WarningOutlined
} from "@mui/icons-material";
import HighlightType from "../Generic/HighlightType";

interface ICardEffectInput {
    effectData: IEffectData,
    finalPower?: number
}



const CardEffect = ({effectData, finalPower}: ICardEffectInput) => {

    const [emblem, setEmblem] = useState<React.ReactNode|null>(null);

    const getFinalText = () => {
        if (effectData.powerX && finalPower) {
            const xpower = Math.floor(finalPower / effectData.powerX);
            return <HighlightType text={effectData.text} number={xpower} />
        }
        return <Typography sx={{fontSize: "0.8rem"}}>{effectData.text}</Typography>
    }

    useEffect(() => {
        switch(effectData.icon.emblem) {
            case 'info':
                setEmblem(<InfoOutlined />)
                break;
            case 'warning':
                setEmblem(<WarningOutlined />)
                break;
            case 'tether':
                setEmblem(<AutoFixHighOutlined />)
                break;
            case 'stamina':
                setEmblem(<DirectionsRunOutlined/>)
                break;
            case 'requirement':
                setEmblem(<ReportGmailerrorredOutlined />)
                break;
            case 'default':
                setEmblem(<SquareOutlined />)
                break;
            case 'priority':
                setEmblem(<PriorityHighOutlined />)
                break;
        }
    }, [effectData]);

    return (
        <Box
            sx={{
                padding: '4px'
            }}
        >
            <Paper elevation={3}
                sx={{
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px',
                    gap: '12px'
                }}
            >

                <Box
                    sx={{
                        display: 'flex'
                    }}
                >{effectData.icon.text}{emblem}</Box>
                <Box
                    sx={{
                        fontSize: '0.8rem',
                    }}
                >
                    {getFinalText()}
                </Box>

            </Paper>
        </Box>
    )
}

export default CardEffect;