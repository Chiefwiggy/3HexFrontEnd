import {IMinionBaseData_New, IMinionRoleData} from "../../Data/IMinionData_New";


class PLC_MinionMetadata {
    private minionRoles: Array<IMinionRoleData>;
    private minionData: Array<IMinionBaseData_New>

    constructor() {
        this.minionRoles = []
        this.minionData = []
    }

    public async Initialize(roles: Array<IMinionRoleData>, data: Array<IMinionBaseData_New>) {
        this.minionRoles = roles;
        this.minionData = data
    }

    public GetRoleById(id: string) {
        return this.minionRoles.find(e => e.roleId === id);
    }

    public GetAllRoles() {
        return this.minionRoles;
    }

    public GetAllMinions() {
        return this.minionData;
    }
}


export default PLC_MinionMetadata;