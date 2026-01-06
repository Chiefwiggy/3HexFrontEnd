import {IDatachipData} from "../../Data/ChipsetData";
import {IHackModifierCardData} from "../../Data/ICardData";


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
        return this.datachips.filter(e => ids.includes(e._id));
    }


    public GetCardsFromDatachipIdList = (ids: Array<string>): Array<IHackModifierCardData> => {
        const datachips = this.GetDatachipsFromIdList(ids);
        return datachips.reduce((pv, cv) => {
            return [...pv, ...cv.builtinHacks]
        }, [] as Array<IHackModifierCardData>)
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