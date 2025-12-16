import Axios, {AxiosRequestConfig} from "axios";
import {ICommonCardData} from "../Data/ICardData";


class CardConnection {

    private _cardURL: string
    private _getConfig: () => AxiosRequestConfig
    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._cardURL = url + "cards/"
        this._getConfig = getConfig
    }

    private GetRouteURL(route: string): string {
        return this._cardURL + route;
    }

    public async GetCharacterCards(charId: string) {
        return await Axios.get(`${this._cardURL}/getPossible/${charId}`, this._getConfig()).then((resp) => {
            return resp.data;
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async AddCard(uri: string, cardData: ICommonCardData) {
        return await Axios.post(`${this._cardURL}/${uri}/add`, cardData, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            throw e
        })
    }

    public async UpdateCard(uri: string, cardId: string, cardData: ICommonCardData) {
        return await Axios.put(`${this._cardURL}/${uri}/update/${cardId}`, cardData, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            throw e
        })
    }



    public async GetCharacterPreparedSpells(charId: string) {
        return await Axios.get(`${this._cardURL}/spells/getPrepared/${charId}`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async GetCharacterPreparedWeapons(charId: string) {
        return await Axios.get(`${this._cardURL}/weapons/getPrepared/${charId}`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async GetClassCards(className: string) {
         return await Axios.get(`${this._cardURL}get/class/${className}`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async GetAffinityCards(affinityName: string) {
         return await Axios.get(`${this._cardURL}get/affinity/${affinityName}`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async GetCardById(cardId: string) {
        return await Axios.get(`${this._cardURL}get/${cardId}`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async GetPathCards(pathName: string) {
         return await Axios.get(`${this._cardURL}get/path/${pathName}`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async GetStandardBaseWeapons() {
        return await Axios.get(`${this._cardURL}weapons/base/getAll`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }




}

export default CardConnection;