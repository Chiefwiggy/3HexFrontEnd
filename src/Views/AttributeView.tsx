import React, {useEffect, useState} from 'react'
import AttributeBar from "../Components/Sheet/AttributeBar";
import {Box, Button, IconButton, Typography} from "@mui/material";
import {RefreshOutlined, SelfImprovementOutlined, SelfImprovementRounded} from "@mui/icons-material";
import SimpleClosableDialog from "../Components/Generic/SimpleClosableDialog";
import useCharacter from "../Hooks/useCharacter/useCharacter";
import useEventHistory from "../Hooks/useEventHistory/useEventHistory";
import {AttributeBarType, DamageType} from "../Data/CharacterSheet";
import {UDamageType} from "../Data/ICardData";
import ActionPointsPanel from "../Components/Sheet/ActionPointsPanel";

interface IAttributeViewInput {
    pivot: boolean
}
const AttributeView = ({pivot}: IAttributeViewInput) => {
       const { currentSheet, charPing, statPing, healthPing  } = useCharacter();
    const {LogEvent} = useEventHistory();

    const [pingValue, setPingValue] = useState<boolean>(false);

    const [refreshPanelOpen, setRefreshPanelOpen] = useState<boolean>(false);
    const [breatherPanelOpen, setBreatherPanelOpen] = useState<boolean>(false);

    const [progressHealth, setProgressHealth] = useState(99);
    const [currentHealth, setCurrentHealth] = useState(0);
    const [currentMaxHealth, setCurrentMaxHealth] = useState(0);

    const [progressStamina, setProgressStamina] = useState(99);
    const [currentStamina, setCurrentStamina] = useState(0);
    const [currentMaxStamina, setCurrentMaxStamina] = useState(0);

    const [progressTether, setProgressTether] = useState(99);
    const [currentTether, setCurrentTether] = useState(0);
    const [currentMaxTether, setCurrentMaxTether] = useState(0);

    const handleRefreshPanel = (open: boolean) => () => {
        setRefreshPanelOpen(open);
    }

    const handleBreatherPanel = (open: boolean) => () => {
        setBreatherPanelOpen(open);
    }

    const ping = () => {
        setPingValue(!pingValue);
    }

    useEffect(() => {
        if (currentSheet) {
            setProgressHealth(Math.min(100, 100 * currentSheet.getBarCurrent("health") / currentSheet.getMaxBar("health")));
            setCurrentHealth(currentSheet.getBarCurrent("health"));
            setCurrentMaxHealth(currentSheet.getMaxBar("health"));
            setProgressStamina(Math.min(100, 100 * currentSheet.getBarCurrent("stamina") / currentSheet.getMaxBar("stamina")));
            setCurrentStamina(currentSheet.getBarCurrent("stamina"));
            setCurrentMaxStamina(currentSheet.getMaxBar("stamina"));
            setProgressTether(Math.min(100, 100 * currentSheet.getBarCurrent("tether") / currentSheet.getMaxBar("tether")));
            setCurrentTether(currentSheet.getBarCurrent("tether"));
            setCurrentMaxTether(currentSheet.getMaxBar("tether"));
        }
    }, [healthPing, statPing])

    const handleRefresh = () => {
        if (currentSheet) {
            currentSheet.refresh();
            LogEvent(`Refreshed...`)
            ping();
        }
        handleRefreshPanel(false)();
    }

    const handleBreathe = () => {
        if (currentSheet) {
            currentSheet.breather();
            LogEvent("Took a breather.");
            ping();
        }
        handleBreatherPanel(false)();
    }

    const handleHealAndUse = (isHeal: boolean) => (bar: AttributeBarType, amount: number) => {
        if (currentSheet) {
            if (isHeal) {
                currentSheet.healCharacter(bar, amount);
            } else {
                currentSheet.useBar(bar, amount);
            }
        }
    }

    const handleDamage = (bar: AttributeBarType, damageType: UDamageType, amount: number, crit: number) => {
        if (currentSheet) {
            currentSheet.damageCharacter(bar, damageType, amount, crit);
        }
    }

    return currentSheet ? (
        <Box>
        <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexDirection: pivot ? "row" : 'column',
                }}
            >
                <AttributeBar barName={"Health"} barColor={"health"} healFunction={handleHealAndUse(true)} damageFunction={handleDamage} takeFunction={handleHealAndUse(false)} currentAttr={currentHealth} currentMaxAttr={currentMaxHealth} progress={progressHealth} />
                <AttributeBar barName={"Stamina"} barColor={"stamina"}  healFunction={handleHealAndUse(true)} damageFunction={handleDamage} takeFunction={handleHealAndUse(false)} currentAttr={currentStamina} currentMaxAttr={currentMaxStamina} progress={progressStamina} />
                <AttributeBar barName={"Tether"} barColor={"tether"} healFunction={handleHealAndUse(true)} damageFunction={handleDamage} takeFunction={handleHealAndUse(false)} currentAttr={currentTether} currentMaxAttr={currentMaxTether} progress={progressTether} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 2,
                            marginBottom: 2
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleRefreshPanel(true)}
                        >
                            <RefreshOutlined />
                        </Button>
                        <IconButton
                            onClick={handleBreatherPanel(true)}
                        ><SelfImprovementOutlined /></IconButton>
                    </Box>

                    <ActionPointsPanel />
                    <SimpleClosableDialog title={"Take a Breather"} buttons={[
                        {
                            label: "Cancel",
                            variant: "contained",
                            color: "error",
                            action: () => setBreatherPanelOpen(false)
                        },
                        {
                            label: "Breathe",
                            variant: "contained",
                            action: handleBreathe
                        }
                    ]} isOpen={breatherPanelOpen} setIsOpen={setBreatherPanelOpen}
                        content={
                            <Box>
                                Would you like to take a breather and regain:
                                <Typography> Regain {currentSheet.getStaminaBreather()} Stamina. </Typography>
                            </Box>
                        } fullWidth={true}
                    />
                    <SimpleClosableDialog
                        title={"Refresh"}
                        buttons={[
                            {
                                label: "Cancel",
                                variant: "contained",
                                color: "error",
                                action: () => setRefreshPanelOpen(false),
                            },
                            {
                                label: "Refresh",
                                variant: "contained",
                                action: handleRefresh
                            }
                        ]}
                        isOpen={refreshPanelOpen}
                        setIsOpen={setRefreshPanelOpen}
                        content={
                            <Box>
                                <Typography>Would you like to refresh? You will regain the following: </Typography>
                                <Typography variant={"h6"}>{currentSheet.data.characterName}</Typography>
                                <Typography> Regain {currentSheet.getStaminaRefresh()} Stamina. </Typography>
                                <Typography> Regain {currentSheet.getTetherRefresh()} Tether. </Typography>
                                {
                                    currentSheet.minionData.map(minion => {
                                        return (
                                            <Box key={minion.data._id}>
                                                <Typography variant={"h6"}>{minion.data.minionName}</Typography>
                                                <Typography> Regain {minion.getStaminaRefresh()} Stamina. </Typography>
                                                <Typography> Regain {minion.getTetherRefresh()} Tether. </Typography>
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        }
                    />
                </Box>

            </Box>
        </Box>
    ) : <></>
}

export default AttributeView;