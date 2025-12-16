import React, {useEffect, useState} from 'react'
import {IUserData} from "../../Data/IUserData";
import UserContext from "./UserContext";
import Axios, {AxiosRequestConfig} from 'axios'
import {ICharacterBaseData} from "../../Data/ICharacterData";

export interface IUserContext {
    SignupUser: (email: string, password: string) => Promise<void>
    LoginUser: (email: string, password: string) => Promise<void>,
    LogoutUser: () => void,
    RemoveCharacterFromUser: (characterId: string) => Promise<void>
    loggedIn: boolean,
    userPermissions: Array<string>,
    charactersOwned: Array<ICharacterBaseData>,
    isReady: boolean
}

export interface IUserResponse {
    refresh: string,
    token: string,
    response: {
        userPermissions: Array<string>
        characters_owned: Array<string>,
        email: string,
        name: string,
        password?: string,
        __v?: number,
        _id?: string
    }
}

const UserProvider = ({children}: any) => {

    const GetAPIConfig = (): AxiosRequestConfig => {
        return {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
        }
    }

    const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3001';

    const [loggedIn, setLoggedIn] = useState(false);
    const [userPermissions, setUserPermissions] = useState<Array<string>>([]);

    const [charactersOwnedIds, setCharactersOwnedIds] = useState<Array<string>>([]);

    const [charactersOwned, setCharactersOwned] = useState<Array<ICharacterBaseData>>([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("refresh") && localStorage.getItem("email")) {
            LoginWithToken(localStorage.getItem("email"), localStorage.getItem("refresh")).then(() => {})
        }
        setIsReady(true);
    }, []);

    const LogoutUser = () => {
        localStorage.clear();
        setUserPermissions([]);
        setLoggedIn(false);
        setCharactersOwnedIds([]);
        setCharactersOwned([]);
    }

    const __SetLoginData = async(data: IUserResponse) => {
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("email", data.response.email);
        localStorage.setItem("name", data.response.name);
        setCharactersOwnedIds(data.response.characters_owned);
        setUserPermissions(data.response.userPermissions);
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        await Axios.get(apiUrl+"characters/getMine", GetAPIConfig()).then((resp) => {
            setCharactersOwned(resp.data);
        }).catch((e) => {
            console.error(e);
            return [];
        })
    }

    const LoginUser = async (email: string, password: string) => {

        const data = {
            email,
            password
        }
        await Axios.post(process.env.REACT_APP_API_URL+"/auth/signin", data).then(async(resp) => {
            await __SetLoginData(resp.data);
        }).catch((e) => {
            console.error(e);
        })
    }

    const RemoveCharacterFromUser = async(characterId: string) => {
        setCharactersOwned(currentCharactersOwned => {
            return currentCharactersOwned.filter(item => item._id !== characterId);
        })
    }

    const SignupUser = async(email: string, password: string) => {
        const data = {
            email,
            password
        }
        await Axios.post(process.env.REACT_APP_API_URL+"/auth/signup", data).then(async(resp) => {
            await LoginUser(email, password);
        })

    }

    const LoginWithToken = async (email: string | null, refresh_token: string | null) => {

        const data = {
            email,
            token: refresh_token
        }

        await Axios.post(process.env.REACT_APP_API_URL+"/auth/refresh/signin", data).then((resp) => {
            __SetLoginData(resp.data);
        }).catch((e) => {
            console.error(e);
        })
    }

    return (
        <UserContext.Provider value={{
            SignupUser,
            LoginUser,
            LogoutUser,
            RemoveCharacterFromUser,
            loggedIn,
            userPermissions,
            charactersOwned,
            isReady
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
