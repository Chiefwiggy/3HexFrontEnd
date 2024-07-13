import Axios, {AxiosRequestConfig} from "axios";


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

    public async GetArcanaCards(arcanaName: string) {
         return await Axios.get(`${this._cardURL}get/arcana/${arcanaName}`, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }




}

export default CardConnection;