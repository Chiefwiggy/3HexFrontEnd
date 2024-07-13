import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {IMinionData} from "../../Data/IMinionData";
import AttributeBar from "../Sheet/AttributeBar";
import { AttributeBarType, DamageType } from '../../Data/CharacterSheet';
import MinionSheet from "../../Data/MinionSheet";

interface IMinionAttributeBarsInput {
    minionData: MinionSheet
}

const MinionAttributeBars = ({
 minionData
}: IMinionAttributeBarsInput) => {
    
    const [progressHealth, setProgressHealth] = useState(99);
    const [currentHealth, setCurrentHealth] = useState(0);
    const [currentMaxHealth, setCurrentMaxHealth] = useState(0);

    const [progressStamina, setProgressStamina] = useState(99);
    const [currentStamina, setCurrentStamina] = useState(0);
    const [currentMaxStamina, setCurrentMaxStamina] = useState(0);

    const [progressTether, setProgressTether] = useState(99);
    const [currentTether, setCurrentTether] = useState(0);
    const [currentMaxTether, setCurrentMaxTether] = useState(0);

    const [triggerPing, setTriggerPing] = useState(false);

    const triggerUpdate = () => {
        setTriggerPing(!triggerPing);
    }
    
    useEffect(() => {
        if (minionData) {
            setProgressHealth(Math.min(100, 100 * minionData.getBarCurrent("health") / minionData.getMaxBar("health")));
            setCurrentHealth(minionData.getBarCurrent("health"));
            setCurrentMaxHealth(minionData.getMaxBar("health"));
            setProgressStamina(Math.min(100, 100 * minionData.getBarCurrent("stamina") / minionData.getMaxBar("stamina")));
            setCurrentStamina(minionData.getBarCurrent("stamina"));
            setCurrentMaxStamina(minionData.getMaxBar("stamina"));
            setProgressTether(Math.min(100, 100 * minionData.getBarCurrent("tether") / minionData.getMaxBar("tether")));
            setCurrentTether(minionData.getBarCurrent("tether"));
            setCurrentMaxTether(minionData.getMaxBar("tether"));
        }
    }, [triggerPing])

    useEffect(() => {
        triggerUpdate();
    }, []);


    const handleHealAndUse = (isHeal: boolean) => (bar: AttributeBarType, amount: number) => {
        if (minionData) {
            if (isHeal) {
                minionData.healCharacter(bar, amount);
            } else {
                minionData.useBar(bar, amount);
            }
            triggerUpdate();
        }
    }

    const handleDamage = (bar: AttributeBarType, damageType: DamageType, amount: number) => {
        if (minionData) {
            minionData.damageCharacter(bar, damageType, amount);
            triggerUpdate()
        }
    }


    return (
        <Box>
            <Box
                sx={{
                    display: "flex"
                }}
            >
                <AttributeBar barName={"Health"} barColor={"health"} healFunction={handleHealAndUse(true)} damageFunction={handleDamage} takeFunction={handleHealAndUse(false)} currentAttr={currentHealth} currentMaxAttr={currentMaxHealth} progress={progressHealth} isSmall={true} />
                <AttributeBar barName={"Stamina"} barColor={"stamina"}  healFunction={handleHealAndUse(true)} damageFunction={handleDamage} takeFunction={handleHealAndUse(false)} currentAttr={currentStamina} currentMaxAttr={currentMaxStamina} progress={progressStamina} isSmall={true} />
                <AttributeBar barName={"Tether"} barColor={"tether"} healFunction={handleHealAndUse(true)} damageFunction={handleDamage} takeFunction={handleHealAndUse(false)} currentAttr={currentTether} currentMaxAttr={currentMaxTether} progress={progressTether} isSmall={true} />
            </Box>

        </Box>
    )
}

export default MinionAttributeBars;