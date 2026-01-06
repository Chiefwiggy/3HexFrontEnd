import {IGadgetData} from "../../Data/IGadgetData";
import {IGadgetCharacterData} from "../../Data/ICharacterData";
import {IScaledWeaponBaseData} from "../../Data/ICardData";
import {ConstructFinalGadget} from "../../Utils/ConstructFinalWeapon";


class PLC_GadgetData {
    private gadgetData: Array<IGadgetData>

    constructor() {
        this.gadgetData = []
    }

    public async Initialize(gd: Array<IGadgetData>) {
        this.gadgetData = gd
    }

    public GetAllGadgets() {
        return this.gadgetData
    }

    public GetGadgetsFromIdList = (ids: Array<string>) => {
        return this.gadgetData.filter(e => ids.includes(e._id));
    }

    public GetGadgetById = (id: string) => {
        return this.gadgetData.find(e => e._id === id);
    }

    public GetGadgetDataForUser(userPermissions: string[]) {
        let finalList = [];
        if (userPermissions.includes("admin") || userPermissions.includes("sources_all")) {
            finalList = this.gadgetData
        } else {
            finalList = this.gadgetData.filter(sd => {
                return (sd.visibility === "all" || userPermissions.includes(`source_${sd._id}`));
            })
        }
        return finalList;
    }

    public GetConstructedGadgets(gadgets: Array<IGadgetCharacterData>): Array<IScaledWeaponBaseData> {

        let finalList: Array<IScaledWeaponBaseData> = []

        gadgets.map(gad => {
            const currentGadget = this.GetGadgetById(gad.gadgetId);
            if (currentGadget && currentGadget.gadgetActionType == "active" && currentGadget.baseHit > 0) {
                finalList = [...finalList, ConstructFinalGadget(currentGadget)];
            }
        })

        console.log("FARGO");
        console.log(finalList);

        return finalList
    }


}

export default PLC_GadgetData