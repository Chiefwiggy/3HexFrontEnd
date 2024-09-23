import React, {useEffect, useState} from 'react';
import {ICalculatedWeapon} from "../../Data/ICharacterData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import SpellCardCalculator from "../../Data/Card Calculators/SpellCardCalculator";
import CalculatedCard from "./CalculatedCard";
import WeaponCardCalculator from "../../Data/Card Calculators/WeaponCardCalculator";
import {ConstructFinalWeapon} from "../../Utils/ConstructFinalWeapon";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import {IConditionCard, IWeaponBaseData} from "../../Data/ICardData";
import ConditionCard from "../Cards/ConditionCard";

interface IPrebuiltWeaponCardWrapperInput {
    weaponData: ICalculatedWeapon | null,
    overrideWidth?: number
}

const PrebuiltWeaponCardWrapper = ({
    weaponData,
    overrideWidth
}: IPrebuiltWeaponCardWrapperInput) => {

     const {currentSheet, isReady, charPing} = useCharacter();

    const [weaponCalc, setWeaponCalc] = useState<WeaponCardCalculator|null>(null);

    const [currentWeaponData, setCurrentWeaponData] = useState<Array<any>>([]);

    const {WeaponData, ConditionData} = usePreloadedContent();

    useEffect(() => {
        if (currentSheet) {
            const newCalc = new WeaponCardCalculator(currentSheet.weaponCalculatorTypes)
            setWeaponCalc(newCalc)
            _setWeaponData(newCalc);
        }

    }, []);

    useEffect(() => {
        if (currentSheet && weaponCalc) {
            _setWeaponData(weaponCalc);
        }
    }, [isReady, weaponData, charPing]);

    const _setWeaponData = (calc: WeaponCardCalculator, timeout = 0) => {
        if (currentSheet && weaponData) {
            let allCards = currentSheet.allCards;
            if (allCards) {
                const allWeapons = allCards.weapons;
                const allBases: Array<IWeaponBaseData> = [...currentSheet.GetPreparedWeaponBases(), ...WeaponData.GetCardPreparedStruct(currentSheet.data.knownWeapons)]
                const allConditions: Array<IConditionCard> = ConditionData.GetAttackConditions()
                const base = allBases.find(b => {
                    return b._id == weaponData.weaponBaseData.baseId;
                });
                const cards = weaponData.weaponCardsIds.map(skill => {
                    return allWeapons.skills.find(b => b._id == skill) ?? allWeapons.forms.find(b => b._id == skill) ?? allConditions.find(b => b._id == skill);
                })
                if (!base) {
                    if (timeout < 10) {
                        setTimeout(() => {
                            _setWeaponData(calc, timeout+1)
                        }, 20+(40*timeout))
                    }
                } else {
                    setCurrentWeaponData([base, ...cards]);
                }

            }
        }
    }

    return currentSheet && weaponCalc ? (
        <CalculatedCard cardCalculator={weaponCalc} depArray={currentWeaponData} overrideName={weaponData?.customName ?? ""} overrideWidth={overrideWidth} owner={currentSheet}/>
    ) : <></>
}

export default PrebuiltWeaponCardWrapper;