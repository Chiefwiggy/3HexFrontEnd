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

    public GetSourceDataForUser(userPermissions: string[]) {
        if (userPermissions.includes("admin") || userPermissions.includes("sources_all")) {
            return this.baseSourceData
        }
        return this.baseSourceData.filter(sd => {
            return (sd.visibility === "all" || userPermissions.includes(`source_${sd._id}`));
        })

    }
}

export default PLC_SourceData;