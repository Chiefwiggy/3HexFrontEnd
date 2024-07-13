import React from 'react';
import {Box, Tab, Tabs} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import ClickPopup from "../Generic/ClickPopup";
import DefensiveStatPopover from "./DefensiveStatPopover";
import {getSkillFormat} from "../../Utils/Shorthand";
import GrayBox from "./GrayBox";

const DefenseWidget = () => {

    const {currentSheet} = useCharacter();

    const [currentTab, setCurrentTab] = React.useState(currentSheet?.getStanceIndex() ?? 0);

    const handleTabChange = (event: React.SyntheticEvent, value: number) => {
        setCurrentTab(value);
        if (currentSheet) {
            currentSheet.setStance(value);
        }
    }

    return currentSheet ? (
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
                </Tabs>
            </Box>
            <br />
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 2fr',
                    textAlign: "center"
                }}
            >
                <Box>
                    pDEF
                </Box>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={currentSheet.getEvadePDEFBreakdown()}
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
                        {currentSheet.getEvadePDEF()}
                    </GrayBox>
                </ClickPopup>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={currentSheet.getBlockPDEFBreakdown()}
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
                        {currentSheet.getBlockPDEF()}
                    </GrayBox>
                </ClickPopup>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 2fr',
                    textAlign: "center"
                }}
            >
                <Box>
                    mDEF
                </Box>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={currentSheet.getEvadeMDEFBreakdown()}
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
                        {currentSheet.getEvadeMDEF()}
                    </GrayBox>
                </ClickPopup>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={currentSheet.getBlockMDEFBreakdown()}
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
                        {currentSheet.getBlockMDEF()}
                    </GrayBox>
                </ClickPopup>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 2fr',
                    textAlign: "center"
                }}
            >
                <Box>
                    Dodge
                </Box>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={currentSheet.getEvadeDodgeBreakdown()}
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
                        {getSkillFormat(currentSheet.getEvadeDodge(), false)}
                    </GrayBox>
                </ClickPopup>
                <ClickPopup
                    clickElement={
                        <DefensiveStatPopover
                            breakdown={currentSheet.getBlockDodgeBreakdown()}
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
                        {getSkillFormat(currentSheet.getBlockDodge(), false)}
                    </GrayBox>
                </ClickPopup>
            </Box>
        </Box>
    ) : <></>
}

export default DefenseWidget;