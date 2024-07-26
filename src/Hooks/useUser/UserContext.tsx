import {createContext} from "react";
import {IUserContext} from "./UserProvider";
import {ICharacterBaseData} from "../../Data/ICharacterData";

const UserContext = createContext<IUserContext>({
    SignupUser: (email: string, string: string) => {},
    LoginUser: (email, string) => {},
    LogoutUser: () => {},
    loggedIn: false,
    userPermissions: [""],
    charactersOwned: [] as Array<ICharacterBaseData>,
} as IUserContext);

export default UserContext;