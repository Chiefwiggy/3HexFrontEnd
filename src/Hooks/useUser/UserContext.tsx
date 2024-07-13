import {createContext} from "react";
import {IUserContext} from "./UserProvider";

const UserContext = createContext<IUserContext>({
    LoginUser: (email, string) => {},
    LogoutUser: () => {},
    loggedIn: false,
    userPermissions: [""],
    charactersOwned: [""]
} as IUserContext);

export default UserContext;