import {createContext} from "react";
import {IUserContext} from "./UserProvider";

const UserContext = createContext<IUserContext>({
    SignupUser: (email: string, string: string) => {},
    LoginUser: (email, string) => {},
    LogoutUser: () => {},
    loggedIn: false,
    userPermissions: [""],
    charactersOwned: [""]
} as IUserContext);

export default UserContext;