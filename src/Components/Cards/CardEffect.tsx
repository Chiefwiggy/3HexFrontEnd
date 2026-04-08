import React, {useEffect, useState} from 'react'
import {IEffectData} from "../../Data/ICardData";
import {Box, Paper, SxProps, Typography} from "@mui/material";
import {
    AutoFixHighOutlined, CasinoOutlined, DirectionsRunOutlined, HeartBrokenOutlined,
    InfoOutlined, LandscapeOutlined, PriorityHigh, PriorityHighOutlined,
    ReportGmailerrorredOutlined,
    SportsMmaOutlined, SquareOutlined, TrendingDownOutlined, TrendingUpOutlined,
    WarningOutlined
} from "@mui/icons-material";
import HighlightType from "../Generic/HighlightType";
import {FaArrowRightArrowLeft, FaMoneyBillWave} from "react-icons/fa6";
import {GiGems, GiLaserBurst, GiPortal, GiSparkSpirit, GiTiedScroll} from "react-icons/gi";
import {SiMagic} from "react-icons/si";
import {GrTechnology} from "react-icons/gr";
import {MdCrisisAlert, MdPowerOff} from "react-icons/md";
import {IoGitNetworkSharp} from "react-icons/io5";
import {TbCornerDownRightDouble} from "react-icons/tb";

interface ICardEffectInput {
    effectData: IEffectData,
    finalPower?: number
}



const CardEffect = ({effectData, finalPower}: ICardEffectInput) => {

    const [emblem, setEmblem] = useState<React.ReactNode|null>(null);
    const [tintColor, setTintColor] = useState<string>("none");
    const [borderSettings, setBorderSettings] = useState<string>("none");
    const [customSx, setCustomSx] = useState<SxProps>(null);

    const getFinalText = () => {
        if (effectData.powerX && finalPower) {
            const xpower = Math.floor(finalPower / effectData.powerX);
            return <HighlightType text={effectData.text} xval={xpower} />
        } else {
            return <HighlightType text={effectData.text} xval={undefined} />
        }
    }

    const setIconData = () => {
        switch(effectData.icon.emblem) {
            case 'power':
                setEmblem(<></>);
                setTintColor("rgba(255,255,255,0)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'info':
                setEmblem(<InfoOutlined />)
                setTintColor("rgba(255,255,255,0)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'die':
                setEmblem(<CasinoOutlined />)
                setTintColor("rgba(255,255,255,0)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'warning':
                setEmblem(<WarningOutlined />)
                setTintColor("rgba(255,255,0,0.07)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'tether':
                setEmblem(<AutoFixHighOutlined />)
                setTintColor("rgba(255,0,255,0.03)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'stamina':
                setEmblem(<DirectionsRunOutlined/>)
                setTintColor("rgba(0,255,0,0.03)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'health':
                setEmblem(<HeartBrokenOutlined />)
                setTintColor("rgba(255,0,0,0.12)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'requirement':
                setEmblem(<ReportGmailerrorredOutlined />)
                setTintColor("rgba(255,0,0,0.07)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'default':
                setEmblem(<SquareOutlined />)
                setTintColor("rgba(0,0,0,0.00)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'priority':
                setEmblem(<PriorityHighOutlined />)
                setTintColor("rgba(255,128,128,0.33)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'buff':
                setEmblem(<TrendingUpOutlined />)
                setTintColor("rgba(255, 255, 255, 0.3)");
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'debuff':
                setEmblem(<TrendingDownOutlined />)
                setTintColor("rgba(0,0,0,0.9)");
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'environment':
                setEmblem(<LandscapeOutlined />);
                setTintColor("rgba(20,255,20,0.15)");
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'money':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><FaMoneyBillWave /></Box>);
                setTintColor("rgba(76,239,76,0.15)");
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'enchantment':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><SiMagic /></Box>)
                setTintColor("rgba(255,143,238,0.22)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'order':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><GiTiedScroll /></Box>)
                setTintColor("rgba(0,245,255,0.15)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'soul_charge':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><GiSparkSpirit /></Box>)
                setTintColor("rgba(191,0,255,0.4)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'surge':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><GiLaserBurst /></Box>)
                setTintColor("rgba(34,134,255,0.4)")
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'rift_object':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><GiPortal /></Box>)
                setTintColor("rgba(42,52,255,0.2)");
                setBorderSettings("rgba(175,19,227,0.81)")
                setCustomSx({
                    border: "1px solid rgba(42,52,255,0.6)",
                    fontSize: "1.2rem",
                    minHeight: "28px",
                    pt: "6px",
                    animation: `
                        coolGlow 4s ease-in-out infinite,
                        gradientShift 6s ease-in-out infinite alternate
                      `,
                    background: 'linear-gradient(90deg, #2a34ffaa, #af13e366, #2ac8ff77, #2a34ffaa)',
                    backgroundSize: '300% 100%',

                    '@keyframes coolGlow': {
                        '0%': {
                            boxShadow: `
                                0 0 2px #2a34ffaa,
                                0 0 5px #2a34ffaa,
                                0 0 9px #2a34ffaa
                              `,
                        },
                        '50%': {
                            boxShadow: `
                                0 0 2px #2a34ffaa,
                                0 0 5px #af13e366,
                                0 0 9px #2ac8ff77
                              `,
                        },
                        '100%': {
                            boxShadow: `
                                0 0 2px #2a34ffaa,
                                0 0 5px #2a34ffaa,
                                0 0 9px #2a34ffff
                              `,
                        },
                    },

                    '@keyframes gradientShift': {
                        '0%': {
                            backgroundPosition: '0% 50%',
                        },
                        '100%': {
                            backgroundPosition: '100% 50%',
                        },
                    },
                });
                break;
            case 'critical':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><MdCrisisAlert /></Box>)
                setTintColor("rgba(255,90,0,0.2)");
                setBorderSettings("1px solid #12345678");
                setCustomSx({
                    border: '1px solid red',
                    fontSize: "1.2rem",
                    minHeight: "28px",
                    pt: "6px",
                    animation: `
                        glow 1.5s ease-in-out infinite alternate,
                        gradientShift 5s ease-in-out infinite alternate
                                             `,
                    background: 'linear-gradient(90deg, rgba(255,0,0,0.44), rgba(255,128,0,0.47), rgba(255,64,0,0.53), rgba(255,0,0,0.44))',
                    backgroundSize: '300% 100%',
                    '@keyframes glow': {
                        from: {
                            boxShadow: '0 0 2px red',
                        },
                        to: {
                            boxShadow: '0 0 10px rgba(255,90,0,0.6)',
                        },
                    },
                    '@keyframes gradientShift': {
                        '0%': {
                            backgroundPosition: '0% 50%',
                        },
                        '100%': {
                            backgroundPosition: '100% 50%',
                        },
                    },
                })
                break;
            case 'material':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><GiGems /></Box>)
                setTintColor("rgba(50,19,188,0.18)");
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'else':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><FaArrowRightArrowLeft /></Box>)
                setTintColor("rgba(255,42,99,0.2)");
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'technik':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center"}}><GrTechnology /></Box>)
                setTintColor("rgba(244,197,29,0.2)");
                setBorderSettings("none")
                setCustomSx(null)
                break;
            case 'choice':
                setEmblem(<Box sx={{paddingLeft: "2px", display: "flex", alignItems: "center", minHeight: "24px"}}><TbCornerDownRightDouble fontSize={"20px"}/></Box>)
                setTintColor("rgba(255,255,255,0)")
                setBorderSettings("none")
                setCustomSx(null)
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
                    backgroundColor: tintColor,
                    border: borderSettings,
                    ...customSx
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: "center"
                    }}
                >
                    {effectData.icon.text} {emblem}</Box>
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