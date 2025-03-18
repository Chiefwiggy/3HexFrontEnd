import {IMountBaseModel} from "../../Data/IMountData";


class PLC_MountData {
    private mountData: Array<IMountBaseModel>;

    constructor() {
        this.mountData = [];
    }

    public async Initialize(mountData: Array<IMountBaseModel>) {
        this.mountData = mountData;
    }

    public GetMountData = () => {
        return this.mountData;
    }

}

export default PLC_MountData;