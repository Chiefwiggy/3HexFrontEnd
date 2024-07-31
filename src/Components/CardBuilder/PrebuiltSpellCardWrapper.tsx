import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Box} from "@mui/material";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import {ICalculatedSpell} from "../../Data/ICharacterData";
import CalculatedCard from "./CalculatedCard";
import SpellCardCalculator from "../../Data/Card Calculators/SpellCardCalculator";



interface IPrebuiltSpellCardWrapperInput {
    spellData: ICalculatedSpell | null,
    overrideWidth?: number
}
const PrebuiltSpellCardWrapper = ({
    spellData,
    overrideWidth
}: IPrebuiltSpellCardWrapperInput) => {

    const {currentSheet, isReady} = useCharacter();

    const [spellCalc, setSpellCalc] = useState<SpellCardCalculator|null>(null);

    const [currentSpellData, setCurrentSpellData] = useState<Array<any>>([]);

    useEffect(() => {
        if (spellCalc) {
            _setSpellData(spellCalc);
        }
    }, [spellData]);


    useEffect(() => {
        if (currentSheet) {
            const newCalc = new SpellCardCalculator(currentSheet.spellCalculatorTypes)
            setSpellCalc(newCalc)
            _setSpellData(newCalc);
        }
    }, [isReady]);


    const _setSpellData = (calc: SpellCardCalculator, timeout = 0) => {
        if (currentSheet && spellData) {
            const allCards = currentSheet.allCards;
            if (allCards) {
                const allSpells = allCards.spells;

                const base = allSpells.bases.find(b => {
                    return b._id == spellData.spellBaseId
                })
                const target = allSpells.targets.find(b => {
                    return b._id == spellData.spellTargetId;
                })
                const skills = spellData.spellSkillsIds.map(skill => {
                    return allSpells.modifiers.find(b => b._id == skill);
                })
                setCurrentSpellData([base, target, ...skills]);
            }
        }
    }

    return currentSheet && spellCalc ? (
        <CalculatedCard cardCalculator={spellCalc} depArray={currentSpellData} overrideName={spellData?.customName ?? ""} overrideWidth={overrideWidth} owner={currentSheet}/>
    ) : <></>
}

export default PrebuiltSpellCardWrapper;