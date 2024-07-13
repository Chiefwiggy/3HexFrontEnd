import {CharacterContext} from "./CharacterContext";
import React, {useEffect, useState} from "react";
import {ICharacterBaseData} from "../../Data/ICharacterData";
import AttributeBar from "../../Components/Sheet/AttributeBar";
import CharacterSheet from "../../Data/CharacterSheet";
import useAPI from "../useAPI/useAPI";

interface ICharacterProvider {
    children: any
}

export interface ICharacterContext {
    currentSheet: CharacterSheet | undefined,
    SetCurrentSheet: (sheet: ICharacterBaseData | undefined) => void,
    isReady: boolean,
    setIsReady: React.Dispatch<React.SetStateAction<boolean>>
    charPing: boolean,
    healthPing: boolean,
    statPing: boolean,
    isInEditMode: boolean,
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    savePing: boolean,
    invokeSave: React.Dispatch<React.SetStateAction<boolean>>,
    cancelPing: boolean,
    invokeCancel: () => void
}


const CharacterProvider = ({children}: ICharacterProvider) => {

    const [currentSheet, setCurrentSheet] = useState<CharacterSheet|undefined>(undefined);
    const [isReady, setIsReady] = useState(false);
    const [isReadySent, sendIsReady] = useState<boolean>(false);
    const [charPing, setCharPing] = useState<boolean>(false);
    const [healthPing, setHealthPing] = useState<boolean>(false);
    const [isInEditMode, setEditMode] = useState<boolean>(false);
    const [savePing, invokeSave] = useState<boolean>(false);
    const [cancelPing, setCancelPing] = useState<boolean>(false);
    const [statPing, setStatPing] = useState<boolean>(false);

    const invokeCancel = () => {
        if (currentSheet) {
            currentSheet.CancelSaveMode();
            setCancelPing(!cancelPing);
        }
    }

    const APIData = useAPI();

    useEffect(() => {
        if (isReadySent) {
            checkIfReady()
        } else {
            setIsReady(false);
        }
    }, [isReadySent]);


    const checkIfReady = (timeout = 0) => {
        if (currentSheet && currentSheet.allCards) {
            setIsReady(true);
        } else if (timeout < 40) {
            setTimeout(() => {
                checkIfReady( timeout+1);
            }, 10+20*timeout)
        } else {
            console.log("Took too long to load...")
        }
    }



    const SetCurrentSheet = (sheet: ICharacterBaseData | undefined) => {
        if (sheet) {
            setCurrentSheet(new CharacterSheet(sheet, APIData, sendIsReady, setCharPing, setHealthPing, setStatPing));
        } else {
            setCurrentSheet(undefined);
        }
    }

    return (
        <CharacterContext.Provider value={{
            currentSheet,
            SetCurrentSheet,
            isReady,
            setIsReady,
            charPing,
            healthPing,
            statPing,
            isInEditMode,
            setEditMode,
            savePing,
            invokeSave,
            cancelPing,
            invokeCancel
        }}>
            {children}
        </CharacterContext.Provider>
    )
}

export default CharacterProvider