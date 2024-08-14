import {ISourceData} from "../../Data/ISourceData";


class PLC_SourceData {
    private baseSourceData: Array<ISourceData>;

    constructor() {
        this.baseSourceData = [];
    }

    public async Initialize(sourceData: Array<ISourceData>) {
        this.baseSourceData = sourceData;
    }

    public GetAllSourceData() {
        return this.baseSourceData;
    }
}

export default PLC_SourceData;