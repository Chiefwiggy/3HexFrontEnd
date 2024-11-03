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

    public GetSourceById(sourceId: string) {
        return this.baseSourceData.find(e => e._id == sourceId)
    }

    public GetSourceDataForUser(userPermissions: string[], dataRequested: "all" | "permanent" | "temporary") {
        let finalList = [];
        if (userPermissions.includes("admin") || userPermissions.includes("sources_all")) {
            finalList = this.baseSourceData
        } else {
            finalList = this.baseSourceData.filter(sd => {
                return (sd.visibility === "all" || userPermissions.includes(`source_${sd._id}`));
            })
        }
        switch(dataRequested) {
            case "all":
                return finalList;
            case "permanent":
                return finalList.filter(e => !e.onlyTemporary)
            case "temporary":
                return finalList.filter(e => !e.neverTemporary)
        }


    }
}

export default PLC_SourceData;