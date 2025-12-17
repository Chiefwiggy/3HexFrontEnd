import {IDatachipData} from "../../Data/ChipsetData";


class PLC_DatachipData {
    private datachips: Array<IDatachipData>

    constructor() {
        this.datachips = [];
    }

    public async Initialize(datachips: Array<IDatachipData>) {
        this.datachips = datachips;
    }

    public GetAllDatachips = () => {
        return this.datachips;
    }

    public GetDatachipsFromIdList = (ids: Array<string>) => {
        console.log("FGONDA")
        console.log(this.datachips)
        return this.datachips.filter(e => ids.includes(e._id));
    }

    public GetDatachipDataForUser(userPermissions: string[]) {
        let finalList = [];
        if (userPermissions.includes("admin") || userPermissions.includes("sources_all")) {
            finalList = this.datachips
        } else {
            finalList = this.datachips.filter(sd => {
                return (sd.visibility === "all" || userPermissions.includes(`source_${sd._id}`));
            })
        }
        return finalList;
    }
}

export default PLC_DatachipData;