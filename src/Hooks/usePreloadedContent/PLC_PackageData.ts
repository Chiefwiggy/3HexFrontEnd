import {IPackageData} from "../../Data/ChipsetData";
import {IHackModifierCardData} from "../../Data/ICardData";


class PLC_PackageData {
    private packages: Array<IPackageData>

    constructor() {
        this.packages = [];
    }

    public async Initialize(packages: Array<IPackageData>) {
        this.packages = packages;
    }

    public GetAllPackages(){
        return this.packages;
    }

    public GetPackagesFromIdList = (ids: Array<string>) => {
        return this.packages.filter(e => ids.includes(e._id));
    }

    public GetCardsFromPackageIdList = (ids: Array<string>) => {
        const packages = this.GetPackagesFromIdList(ids);
        return packages.reduce((pv, cv) => {
            return [...pv, ...cv.builtinHacks]
        }, [] as Array<IHackModifierCardData>)
    }

    public GetPackageDataForUser(userPermissions: string[]) {
        let finalList = [];
        if (userPermissions.includes("admin") || userPermissions.includes("sources_all")) {
            finalList = this.packages
        } else {
            finalList = this.packages.filter(sd => {
                return (sd.visibility === "all" || userPermissions.includes(`source_${sd._id}`));
            })
        }
        return finalList;
    }
}

export default PLC_PackageData;