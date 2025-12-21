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

    public GetSourceDataForUser(userPermissions: string[], dataRequested: "all" | "permanent" | "temporary", campaignIds: string[] = ["all"]) {
        let prefinalList = [];
        if (userPermissions.includes("admin") || userPermissions.includes("sources_all")) {
            prefinalList = this.baseSourceData
        } else {
            prefinalList = this.baseSourceData.filter(sd => {
                return (sd.visibility === "all" || userPermissions.includes(`source_${sd._id}`));
            })
        }

        switch(dataRequested) {
            case "permanent":
                prefinalList = prefinalList.filter(e => !e.onlyTemporary)
                break;
            case "temporary":
                prefinalList = prefinalList.filter(e => !e.neverTemporary)
                break;
        }

        if (!campaignIds.includes("all")) {
            return prefinalList.filter(source =>
                source.campaignIds?.some(id => campaignIds.includes(id) || id == "nature")
            );
        }
        return prefinalList;

    }
}

export default PLC_SourceData;