import Axios, {AxiosRequestConfig} from 'axios';

class CardRequestConnection {
    private _requestURL: string;
    private _getConfig: () => AxiosRequestConfig;
    constructor(url: string, getConfig: () => AxiosRequestConfig) {
        this._requestURL = url;
        this._getConfig = getConfig;
    }

    public async GetAllRequests() {
        return await Axios.get(`${this._requestURL}/card_requests/getAll`, this._getConfig()).then((resp) => {
            return resp.data.requests;
        }).catch((e) => {
            console.error(e)
            return []
        })
    }

    public async MakeRequest(username: string, request_type: string, update_uri: string, json_to_update: string, update_id: string) {
        const finalData = {
            username,
            request_type,
            update_uri,
            json_to_update,
            update_id,
            status: "pending"
        }
        return await Axios.post(`${this._requestURL}/card_requests/make`, finalData, this._getConfig()).then((resp) => {
            return resp.data
        }).catch((e) => {
            console.error(e)
            return []
        })
    }
}

export default CardRequestConnection;