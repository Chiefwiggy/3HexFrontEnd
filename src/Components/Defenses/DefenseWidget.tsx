import React, {useEffect, useState} from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import ClickPopup from "../Generic/ClickPopup";
import DefensiveStatPopover from "./DefensiveStatPopover";
import {getSkillFormat} from "../../Utils/Shorthand";
import GrayBox from "./GrayBox";
import AbstractSheet from "../../Data/AbstractSheet";

interface IDefenseWidgetInput {
    sheet: AbstractSheet
}
const DefenseWidget = ({
    sheet
}: IDefenseWidgetInput) => {


    useEffect(() => {
        setCurrentTab(sheet.getStanceIndex() ?? 0)
    }, [sheet]);

    const [currentTab, setCurrentTab] = React.useState(sheet.getStanceIndex() ?? 0);

    const handleTabChange = (event: React.SyntheticEvent, value: number) => {
        setCurrentTab(value);
        sheet.setStance(value);
    }

    return sheet ? (
        <Box
            sx={{
                display: 'flex',
                flexDirection: "column"
            }}
        >
            <Box>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant={"fullWidth"}
                >
                    <Tab value={0} label="Evade" />
                    <Tab value={1} label="Block" />
                    <Tab value={2} label={"Exposed"} />
                </Tabs>
            </Box>
            <br />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 2fr 2fr',
                    textAlign: "center"
                }}
            >
                <Box>
                    pDEF
                </Box>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={sheet.getEvadePDEFBreakdown()}
                        />
                    }
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "right"
                    }}
                >
                    <GrayBox index={0} currentTab={currentTab}>
                        {sheet.getEvadePDEF()}
                    </GrayBox>
                </ClickPopup>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={sheet.getBlockPDEFBreakdown()}
                        />
                    }
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "left"
                    }}
                >
                    <GrayBox index={1} currentTab={currentTab}>
                        {sheet.getBlockPDEF()}
                    </GrayBox>
                </ClickPopup>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={sheet.getEvadePDEFBreakdown()}
                        />
                    }
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "right"
                    }}
                >
                    <GrayBox index={2} currentTab={currentTab}>
                        {sheet.getEvadePDEF()}
                    </GrayBox>
                </ClickPopup>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 2fr 2fr',
                    textAlign: "center"
                }}
            >
                <Box>
                    mDEF
                </Box>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={sheet.getEvadeMDEFBreakdown()}
                        />
                    }
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "right"
                    }}
                >
                    <GrayBox index={0} currentTab={currentTab}>
                        {sheet.getEvadeMDEF()}
                    </GrayBox>
                </ClickPopup>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={sheet.getBlockMDEFBreakdown()}
                        />
                    }
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "left"
                    }}
                >
                    <GrayBox index={1} currentTab={currentTab}>
                        {sheet.getBlockMDEF()}
                    </GrayBox>
                </ClickPopup>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={sheet.getEvadeMDEFBreakdown()}
                        />
                    }
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "right"
                    }}
                >
                    <GrayBox index={2} currentTab={currentTab}>
                        {sheet.getEvadeMDEF()}
                    </GrayBox>
                </ClickPopup>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 2fr 2fr',
                    textAlign: "center"
                }}
            >
                <Box>
                    Dodge
                </Box>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={sheet.getEvadeDodgeBreakdown()}
                        />
                    }
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "left"
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "right"
                    }}
                >
                    <GrayBox index={0} currentTab={currentTab}>
                        {getSkillFormat(sheet.getEvadeDodge(), false)}
                    </GrayBox>
                </ClickPopup>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={sheet.getBlockDodgeBreakdown()}
                        />
                    }
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "left"
                    }}
                >
                    <GrayBox index={1} currentTab={currentTab}>
                        {getSkillFormat(sheet.getBlockDodge(), false)}
                    </GrayBox>
                </ClickPopup>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={sheet.getBlockDodgeBreakdown()}
                        />
                    }
                    anchorOrigin={{
                        vertical: "center",
                        horizontal: "right"
                    }}
                    transformOrigin={{
                        vertical: "center",
                        horizontal: "left"
                    }}
                >
                    <GrayBox index={2} currentTab={currentTab}>
                        {getSkillFormat(sheet.getBlockDodge(), false)}
                    </GrayBox>
                </ClickPopup>
            </Box>
        </Box>
    ) : <></>
}

export default DefenseWidget;