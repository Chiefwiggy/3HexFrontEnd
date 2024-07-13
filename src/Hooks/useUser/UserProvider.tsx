import React, {useEffect, useState} from 'react'
import {IUserData} from "../../Data/IUserData";
import UserContext from "./UserContext";
import Axios from 'axios'

export interface IUserContext {
    LoginUser: (email: string, password: string) => Promise<void>,
    LogoutUser: () => void,
    loggedIn: boolean,
    userPermissions: Array<string>,
    charactersOwned: Array<string>
}

export interface IUserResponse {
    refresh: string,
    token: string,
    response: {
        userPermissions: Array<string>
        characters_owned: Array<string>,
        email: string,
        password?: string,
        __v?: number,
        _id?: string
    }
}

const UserProvider = ({children}: any) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userPermissions, setUserPermissions] = useState<Array<string>>([]);

    const [charactersOwned, setCharactersOwned] = useState<Array<string>>([]);

    useEffect(() => {
        if (sessionStorage.getItem("refresh") && sessionStorage.getItem("email")) {
            LoginWithToken(sessionStorage.getItem("email"), sessionStorage.getItem("refresh")).then(() => {})
        }
    }, []);

    const LogoutUser = () => {
        sessionStorage.clear();
        setUserPermissions([]);
        setLoggedIn(false);
        setCharactersOwned([]);
    }

    const __SetLoginData = (data: IUserResponse) => {
        sessionStorage.setItem("refresh", data.refresh);
        sessionStorage.setItem("email", data.response.email);
        setCharactersOwned(data.response.characters_owned);
        setUserPermissions(data.response.userPermissions);
        sessionStorage.setItem("token", data.token);
        setLoggedIn(true);
    }

    const LoginUser = async (email: string, password: string) => {

        const data = {
            email,
            password
        }
        await Axios.post(process.env.REACT_APP_API_URL+"/auth/signin", data).then((resp) => {
            __SetLoginData(resp.data);
        }).catch((e) => {
            console.error(e);
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
            LoginUser,
            LogoutUser,
            loggedIn,
            userPermissions,
            charactersOwned
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
