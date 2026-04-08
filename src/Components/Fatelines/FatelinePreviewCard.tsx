import React, {useEffect, useRef, useState} from 'react';
import {Box, Typography} from "@mui/material";
import {IFatelineFullData} from "../../Data/IFatelineData";
import FatelineIcon from "./FatelineIcon";


interface IFatelinePreviewCardInput {
    gotoDetailedView: (fatelineId: string) => void
    fatelineData: IFatelineFullData,
    forceReversed?: boolean,
    fateSelected?: boolean,
    uprightSelected?: boolean
}

const FatelinePreviewCard = ({gotoDetailedView, fatelineData, forceReversed = false, fateSelected = false, uprightSelected = true}: IFatelinePreviewCardInput) => {

    const toRoman = (num: number): string => {
        if (num <= 0) return '0'
        if (num == 22) return '∞'
        const values: [number, string][] = [
            [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
        ];
        let result = '';
        for (const [value, numeral] of values) {
            while (num >= value) {
                result += numeral;
                num -= value;
            }
        }
        return result;
    }

    const [romanNumeral, setRomanNumeral] = useState<string>("")
    const [showReversed, setShowReversed] = useState<boolean>(forceReversed)

    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setRomanNumeral(toRoman(fatelineData.fatelineNumber))
    }, [fatelineData]);

    // @ts-ignore
    return (
        <Box
            onMouseLeave={() => setShowReversed(forceReversed)}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Box
                sx={{
                    width: "176px",
                    height: "304px",
                    backgroundColor: "#343434",
                    borderRadius: "12px",
                    position: "relative"  // Add this
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateRows: "1fr 1fr",
                        height: "100%"
                    }}
                >
                    <Box
                        onMouseEnter={() => setShowReversed(false)}
                        onClick={() => gotoDetailedView(fatelineData.fatelineId)}
                        sx={{
                            backgroundColor: "#232323",
                            borderRadius: "12px 12px 0 0",
                            "&:hover": {
                                backgroundColor: "rgba(100, 180, 255, 0.1)"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)",
                                    width: "80px",
                                    height: "32px",
                                    bgcolor: "#454545",
                                }}
                            >
                                <Typography variant="h6" component="div"   sx={{
                                    userSelect: "none",
                                }}>{romanNumeral}</Typography>
                            </Box>
                        </Box>


                    </Box>
                    { /* --- REVERSED --- */ }
                    <Box
                        onMouseEnter={() => {
                            hoverTimeout.current = setTimeout(() => {
                                setShowReversed(true);
                            }, 300); // 0.5s delay
                        }}
                        onMouseLeave={() => {
                            if (hoverTimeout.current) {
                                clearTimeout(hoverTimeout.current);
                                hoverTimeout.current = null;
                            }
                            setShowReversed(false);
                        }}
                        onClick={() => gotoDetailedView(fatelineData.fatelineId+"_reversed")}
                        sx={{
                            backgroundColor: "#232323",
                            borderRadius: "0 0 12px 12px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            borderTop: "1px solid #676767",
                            "&:hover": {
                                backgroundColor: "rgba(255, 80, 80, 0.1)",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
                                    width: "160px",
                                    height: "32px",
                                    bgcolor: "#454545",
                                }}
                            >
                                <Typography sx={{
                                    fontSize: "16px",userSelect: "none"
                                }}>{fatelineData.fatelineName}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Centered overlay box */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: `
                            translate(-50%, -50%) 
                            rotate(${showReversed ? "180" : "0"}deg)
                        `,
                        transition: "transform 0.8s ease, filter 0.8s ease, --glow-color 0.4s ease",
                        borderRadius: "100px",
                        width: "120px",
                        height: "120px",
                        backgroundColor: "#121212",
                        color: "white",
                        '--glow-color': showReversed
                            ? 'rgba(255, 80, 80, 0.6)'
                            : 'rgba(100, 180, 255, 0.6)',
                        filter: fateSelected ?
                                `
                                    drop-shadow(0 0 6px var(--glow-color))
                                    drop-shadow(0 0 12px var(--glow-color))
                                    drop-shadow(0 0 20px var(--glow-color))
                                `
                            :
                                `
                                    drop-shadow(0 0 6px var(--glow-color))
                                `

                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <FatelineIcon style={{
                            width: "80px",
                            height: "80px",
                            color: "#fff",
                            fill: "#fff",
                            '--glow-color': showReversed
                                ? 'rgba(255, 80, 80, 0.6)'
                                : 'rgba(100, 180, 255, 0.6)',
                            filter:
                                `
                                    drop-shadow(0 0 6px var(--glow-color))
                                    drop-shadow(0 0 12px var(--glow-color))
                                    drop-shadow(0 0 20px var(--glow-color))
                                `,
                            transition: 'filter 0.8s ease, --glow-color 0.4s ease'
                        }} fatelineId={fatelineData.fatelineId} />
                    </Box>

                </Box>
            </Box>
        </Box>

    )
}

export default FatelinePreviewCard