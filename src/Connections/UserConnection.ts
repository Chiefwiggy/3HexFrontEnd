import Axios, {AxiosRequestConfig} from "axios";


class UserConnection {

    private _userURL: string;
    private _getConfig: () => AxiosRequestConfig;

    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._userURL = url + "users/";
        this._getConfig = getConfig;
    }

    public async AddCharacterToUser(characterId: string) {
        return await Axios.post(`${this._userURL}characters/add/${characterId}/owner`, {}, this._getConfig()).then((resp) => {
            return resp.data;
        }).catch((e) => {
            console.error(e);
            return {}
        })
    }





}

export default UserConnection;