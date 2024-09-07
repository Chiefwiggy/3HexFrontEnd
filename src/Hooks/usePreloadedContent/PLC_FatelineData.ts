import {IFatelineFullData} from "../../Data/IFatelineData";


class PLC_FatelineData {
    private fatelineData: Array<IFatelineFullData>

    constructor() {
        this.fatelineData = [];
    }

    public async Initialize(fd: Array<IFatelineFullData>) {
        this.fatelineData = fd;
    }

    public GetAllFatelineData() {
        return this.fatelineData;
    }

    public GetFatelineDataByNumber(fatelineNumber: number) {
        return this.fatelineData.find(fd => fd.fatelineNumber === fatelineNumber);
    }

    public GetFatelineDataById(fatelineId: string) {
        return this.fatelineData.find(fd => fd.fatelineId === fatelineId)
    }
}

export default PLC_FatelineData