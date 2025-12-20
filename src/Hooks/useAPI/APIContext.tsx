import React, {createContext} from 'react'
import {IAPIContext} from "./APIProvider";
import CharacterConnection from "../../Connections/CharacterConnection";
import CardConnection from "../../Connections/CardConnection";
import EquipmentConnection from "../../Connections/EquipmentConnection";
import AbilityConnection from "../../Connections/AbilityConnection";
import UserConnection from "../../Connections/UserConnection";
import ClassConnection from "../../Connections/ClassConnection";
import MinionConnection from "../../Connections/MinionConnection";
import PreloadedConnection from "../../Connections/PreloadedConnection";
import ImageLibraryConnection from "../../Connections/ImageLibraryConnection";
import CardRequestConnection from "../../Connections/CardRequestConnection";
import SourceConnection from "../../Connections/SourceConnection";

export const APIContext = createContext<IAPIContext>({
    CharacterAPI: new CharacterConnection("", () => {
        return {}
    }),
    CardAPI: new CardConnection("", () => {
        return {}
    }),
    EquipmentAPI: new EquipmentConnection("", () => {
        return {}
    }),
    AbilityAPI: new AbilityConnection("", () =>{
        return {}
    }),
    UserAPI: new UserConnection("", () =>{
        return {}
    }),
    ClassAPI: new ClassConnection("", () =>{
        return {}
    }),
    MinionAPI: new MinionConnection("", () => {
        return {}
    }),
    PreloadedAPI: new PreloadedConnection("", () =>{
        return {}
    }),
    ImageLibraryAPI: new ImageLibraryConnection("", () => {
        return {}
    }),
    CardRequestAPI: new CardRequestConnection("", () => {
        return {}
    }),
    SourceAPI: new SourceConnection("", () => {
        return {}
    })
})