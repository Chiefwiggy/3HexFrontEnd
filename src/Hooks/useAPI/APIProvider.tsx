import React, {useEffect, useState} from 'react'
import {APIContext} from "./APIContext";
import Axios, {AxiosRequestConfig} from 'axios'
import CharacterConnection from "../../Connections/CharacterConnection";
import useUser from "../useUser/useUser";
import CardConnection from "../../Connections/CardConnection";
import EquipmentConnection from "../../Connections/EquipmentConnection";
import AbilityConnection from "../../Connections/AbilityConnection";
import UserConnection from "../../Connections/UserConnection";
import ClassConnection from "../../Connections/ClassConnection";
import MinionConnection from "../../Connections/MinionConnection";
import PreloadedConnection from "../../Connections/PreloadedConnection";

interface IAPIProviderInput {
    children: any
}

export interface IAPIContext {
    CharacterAPI: CharacterConnection,
    CardAPI: CardConnection,
    EquipmentAPI: EquipmentConnection,
    AbilityAPI: AbilityConnection,
    UserAPI: UserConnection,
    ClassAPI: ClassConnection,
    MinionAPI: MinionConnection,
    PreloadedAPI: PreloadedConnection,
}

const APIProvider = ({children}: IAPIProviderInput) => {

    const apiURL = process.env.REACT_APP_API_URL ?? 'http://localhost:3001';


    const GetAPIConfig = (): AxiosRequestConfig => {
        return {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        }
    }

    const [CharacterAPI, setCharacterAPI] = useState<CharacterConnection>(new CharacterConnection(apiURL, GetAPIConfig));

    const [CardAPI, setCardAPI] = useState<CardConnection>(new CardConnection(apiURL, GetAPIConfig));

    const [EquipmentAPI, setEquipmentAPI] = useState<EquipmentConnection>(new EquipmentConnection(apiURL, GetAPIConfig));

    const [AbilityAPI, setAbilityAPI] = useState<AbilityConnection>(new AbilityConnection(apiURL, GetAPIConfig));

    const [UserAPI, setUserAPI] = useState<UserConnection>(new UserConnection(apiURL, GetAPIConfig));

    const [ClassAPI, setClassAPI] = useState<ClassConnection>(new ClassConnection(apiURL, GetAPIConfig));

    const [MinionAPI, setMinionAPI] = useState<MinionConnection>(new MinionConnection(apiURL, GetAPIConfig));

    const [PreloadedAPI, setPreloadedAPI] = useState<PreloadedConnection>(new PreloadedConnection(apiURL, GetAPIConfig));

    return (
        <APIContext.Provider value={{
            CharacterAPI,
            CardAPI,
            EquipmentAPI,
            AbilityAPI,
            UserAPI,
            ClassAPI,
            MinionAPI,
            PreloadedAPI
        }}>
            {children}
        </APIContext.Provider>
    )
}

export default APIProvider