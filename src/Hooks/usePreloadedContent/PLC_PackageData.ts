import {IPackageData} from "../../Data/ChipsetData";


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