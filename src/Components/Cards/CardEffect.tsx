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
    const [tintColor, setTintColor] = useState<string>("none");

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
                setTintColor("rgba(255,255,0,0.07)")
                break;
            case 'tether':
                setEmblem(<AutoFixHighOutlined />)
                setTintColor("rgba(255,0,255,0.03)")
                break;
            case 'stamina':
                setEmblem(<DirectionsRunOutlined/>)
                setTintColor("rgba(0,255,0,0.03)")
                break;
            case 'requirement':
                setEmblem(<ReportGmailerrorredOutlined />)
                setTintColor("rgba(255,0,0,0.07)")
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
                    gap: '12px',
                    backgroundColor: tintColor
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