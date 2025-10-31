import React, {useEffect, useState} from 'react';
import {Box} from "@mui/material";
import {ICalculatedHack} from "../../Data/ICharacterData";
import useCharacter from "../../Hooks/useCharacter/useCharacter";
import SpellCardCalculator from "../../Data/Card Calculators/SpellCardCalculator";
import usePreloadedContent from "../../Hooks/usePreloadedContent/usePreloadedContent";
import CalculatedCard from "./CalculatedCard";
import HackCardCalculator from "../../Data/Card Calculators/HackCardCalculator";

interface IPrebuiltHackCardWrapperInput {
    hackData: ICalculatedHack | null,
    overrideWidth?: number
}

const PrebuiltHackCardWrapper = ({
    hackData,
    overrideWidth
                                 }: IPrebuiltHackCardWrapperInput) => {
    const {currentSheet, isReady} = useCharacter();

    const [hackCalc, setHackCalc] = useState<HackCardCalculator|null>(null);

    const [currentHackData, setCurrentHackData] = useState<Array<any>>([]);

    useEffect(() => {
        if (hackCalc) {
            _setHackData(hackCalc);
        }
    }, [hackData]);

    const {ConditionData} = usePreloadedContent();


    useEffect(() => {
        if (currentSheet) {
            const newCalc = new HackCardCalculator(currentSheet.getHackCalculatorTypes())
            setHackCalc(newCalc)
            _setHackData(newCalc);
        }
    }, [isReady]);


    const _setHackData = (calc: HackCardCalculator, timeout = 0) => {
        if (currentSheet && hackData) {
            const allCards = currentSheet.allCards;
            if (allCards) {
                const allHacks = allCards.hacks;
                const allConditions = ConditionData.GetSpellConditions();

                const base = allHacks.bases.find(b => {
                    return b._id == hackData.hackFunctionId
                })
                const io = allHacks.io.find(b => {
                    return b._id == hackData.hackIOId;
                })
                const protocol = allHacks.protocols.find(b => {
                    return b._id == hackData.hackProtocolId
                })
                const skills = hackData.hackCardsIds.map(skill => {
                    return allHacks.modifiers.find(b => b._id == skill) ?? allConditions.find(b => b._id == skill);
                })
                setCurrentHackData([base, io, protocol, ...skills]);
            }
        }
    }

    return currentSheet && hackCalc ? (
        <CalculatedCard cardCalculator={hackCalc} depArray={currentHackData} overrideName={hackData?.customName ?? ""} overrideWidth={overrideWidth} owner={currentSheet}/>
    ) : <></>
}

export default PrebuiltHackCardWrapper