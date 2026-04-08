import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import FatelineIcon from "./FatelineIcon";
import BoxWithTooltip from "../Generic/BoxWithTooltip";
import {getFatelineNameFromId} from "../../Utils/Shorthand";

interface IFatelineEmblemInput {
    fatelineId: string;
    size?: number;
    overrideSelected?: boolean
}

const FatelineEmblem = ({ fatelineId, size = 120, overrideSelected = false}: IFatelineEmblemInput) => {

    const [isReversed, setReversed] = useState<boolean>(false);
    const [trueId, setTrueId] = useState<string>("automaton");

    useEffect(() => {
        if (fatelineId) {
            const reversed = fatelineId.endsWith("_reversed")
            const t_trueId = reversed
                ? fatelineId.slice(0, -"_reversed".length)
                : fatelineId;
            setReversed(reversed)
            setTrueId(t_trueId)
            }
    }, [fatelineId]);

    const glowColor = overrideSelected ? 'rgba(230,230,230,0.6)' : (isReversed
        ? 'rgba(255, 80, 80, 0.6)'
        : 'rgba(100, 180, 255, 0.6)');

    const iconSize = Math.round(size * (2 / 3));

    return (
        <BoxWithTooltip
            sx={{
                transform: `rotate(${isReversed ? "180" : "0"}deg)`,
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
                flexShrink: 0,
                backgroundColor: "#121212",
                color: "white",
                '--glow-color': glowColor,
                filter: overrideSelected ? `
                    drop-shadow(0 0 6px var(--glow-color))
                `
                    :
                    `
                    drop-shadow(0 0 6px var(--glow-color))
                    drop-shadow(0 0 12px var(--glow-color))
                    drop-shadow(0 0 20px var(--glow-color))
                `
                ,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} title={`${getFatelineNameFromId(trueId)}${isReversed ? " - Reversed" : ""}`} placement={"bottom"}>
            <FatelineIcon
                fatelineId={trueId}
                style={{
                    width: `${iconSize}px`,   // ← scales with size
                    height: `${iconSize}px`,
                    color: "#fff",
                    fill: "#fff",
                    '--glow-color': glowColor,
                    filter: `
                        drop-shadow(0 0 6px var(--glow-color))
                        drop-shadow(0 0 12px var(--glow-color))
                        drop-shadow(0 0 20px var(--glow-color))
                    `,
                }}
            />
        </BoxWithTooltip>
    );
};

export default FatelineEmblem;