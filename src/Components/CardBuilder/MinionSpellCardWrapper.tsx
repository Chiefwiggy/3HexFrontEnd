import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import SpellCardCalculator from "../../Data/Card Calculators/SpellCardCalculator";
import CalculatedCard from "./CalculatedCard";
import {ICalculatedSpell, ICalculatedWeapon} from "../../Data/ICharacterData";
import MinionSheet from "../../Data/MinionSheet";
import WeaponCardCalculator from "../../Data/Card Calculators/WeaponCardCalculator";
import MinionSheet_v3 from "../../Data/Minion/MinionSheet_v3";

interface IMinionSpellCardWrapperInput {
    spellData: ICalculatedSpell| null,
    overrideWidth?: number,
    minionData: MinionSheet_v3,
    ping: boolean
}

const MinionSpellCardWrapper = ({
    spellData,
    overrideWidth,
    minionData,
    ping
}: IMinionSpellCardWrapperInput) => {

    const {isReady} = useCharacter();

    const [spellCalc, setSpellCalc] = useState<SpellCardCalculator|null>(null);

    const [currentSpellData, setCurrentSpellData] = useState<Array<any>>([]);

    useEffect(() => {
        if (minionData) {
            const newCalc = new SpellCardCalculator(minionData.getSpellCalculatorTypes())
            setSpellCalc(newCalc)
            _setSpellData(newCalc);
        }

    }, []);

    useEffect(() => {
        if (minionData && spellCalc) {
            _setSpellData(spellCalc);
        }
    }, [isReady, spellData, ping]);


    const _setSpellData = (calc: SpellCardCalculator, timeout = 0) => {
        if (minionData && spellData) {
            const allCards = minionData.data.cardData
            if (allCards) {

                const base = allCards.find(b => {
                    return b._id == spellData.spellBaseId
                })
                const target = allCards.find(b => {
                    return b._id == spellData.spellTargetId;
                })
                const skills = spellData.spellSkillsIds.map(skill => {
                    return allCards.find(b => b._id == skill);
                })
                setCurrentSpellData([base, target, ...skills]);
            }
        }
    }

    return minionData && spellCalc ? (
        <CalculatedCard cardCalculator={spellCalc} depArray={currentSpellData} overrideName={spellData?.customName ?? ""} overrideWidth={overrideWidth} owner={minionData}/>
    ) : <></>
}

export default MinionSpellCardWrapper