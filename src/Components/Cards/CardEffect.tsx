import React, {useEffect, useState} from 'react'
import {IEffectData} from "../../Data/ICardData";
import {Box, Paper, Typography} from "@mui/material";
import {
    AutoFixHighOutlined, DirectionsRunOutlined, HeartBrokenOutlined,
    InfoOutlined, LandscapeOutlined, PriorityHigh, PriorityHighOutlined,
    ReportGmailerrorredOutlined,
    SportsMmaOutlined, SquareOutlined, TrendingDownOutlined, TrendingUpOutlined,
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

    const setIconData = () => {
        switch(effectData.icon.emblem) {
            case 'power':
                setEmblem(<></>);
                setTintColor("rgba(255,255,255,0)")
                break;
            case 'info':
                setEmblem(<InfoOutlined />)
                setTintColor("rgba(255,255,255,0)")
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
            case 'health':
                setEmblem(<HeartBrokenOutlined />);;
                setTintColor("rgba(255,0,0,0.12)")
                break;
            case 'requirement':
                setEmblem(<ReportGmailerrorredOutlined />)
                setTintColor("rgba(255,0,0,0.07)")
                break;
            case 'default':
                setEmblem(<SquareOutlined />)
                setTintColor("rgba(0,0,0,0.00)")
                break;
            case 'priority':
                setEmblem(<PriorityHighOutlined />)
                setTintColor("rgba(255,128,128,0.33)")
                break;
            case 'buff':
                setEmblem(<TrendingUpOutlined />)
                setTintColor("rgba(255, 255, 255, 0.3)");
                break;
            case 'debuff':
                setEmblem(<TrendingDownOutlined />)
                setTintColor("rgba(0,0,0,0.9)");
                break;
            case 'environment':
                setEmblem(<LandscapeOutlined />);
                setTintColor("rgba(20,255,20,0.15)");
                break;
        }
    }

    useEffect(() => {
        setIconData();
    }, [effectData]);

    useEffect(() => {
        setIconData()
    }, []);

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