import React, {useEffect, useState} from 'react';
import {ICalculatedWeapon} from "../../Data/ICharacterData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import SpellCardCalculator from "../../Data/Card Calculators/SpellCardCalculator";
import CalculatedCard from "./CalculatedCard";
import WeaponCardCalculator from "../../Data/Card Calculators/WeaponCardCalculator";

interface IPrebuiltWeaponCardWrapperInput {
    weaponData: ICalculatedWeapon | null,
    overrideWidth?: number
}

const PrebuiltWeaponCardWrapper = ({
    weaponData,
    overrideWidth
}: IPrebuiltWeaponCardWrapperInput) => {

     const {currentSheet, isReady} = useCharacter();

    const [weaponCalc, setWeaponCalc] = useState<WeaponCardCalculator|null>(null);

    const [currentWeaponData, setCurrentWeaponData] = useState<Array<any>>([]);

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
    }, [isReady, weaponData]);

    const _setWeaponData = (calc: WeaponCardCalculator, timeout = 0) => {
        if (currentSheet && weaponData) {
            let allCards = currentSheet.allCards;
            if (allCards) {
                console.log(allCards);
                const allWeapons = allCards.weapons;

                const base = allWeapons.bases.find(b => {
                    return b._id == weaponData.weaponBaseId
                })
                const cards = weaponData.weaponCardsIds.map(skill => {
                    return allWeapons.skills.find(b => b._id == skill) ?? allWeapons.forms.find(b => b._id == skill);
                })
                setCurrentWeaponData([base, ...cards]);
            }
        }
    }

    return currentSheet && weaponCalc ? (
        <CalculatedCard cardCalculator={weaponCalc} depArray={currentWeaponData} overrideName={weaponData?.customName ?? ""} overrideWidth={overrideWidth}/>
    ) : <></>
}

export default PrebuiltWeaponCardWrapper;