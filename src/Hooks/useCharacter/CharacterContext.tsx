import {createContext} from 'react'
import {ICharacterContext} from "./CharacterProvider";
import {ICharacterBaseData} from "../../Data/ICharacterData";


export const CharacterContext = createContext<ICharacterContext>({
    currentSheet: undefined,
    SetCurrentSheet: (sheet: ICharacterBaseData | undefined) => {},
    isReady: false,
    setIsReady: () => {},
    charPing: false,
    statPing: false,
    healthPing: false,
    isInEditMode: false,
    setEditMode: () => {},
    savePing: false,
    invokeSave: () => {},
    cancelPing: false,
    invokeCancel: () => {}
});