import React from 'react'
import ProtectedRoute from "./ProtectedRoute";
import useUser from "../../Hooks/useUser/useUser";

interface ILoggedInRouteInput {
    element: React.ReactElement,
    reverse?: boolean,
    reroute?: string
}

const LoggedInRoute = ({
    element,
    reverse = false,
    reroute="/"
}: ILoggedInRouteInput) => {

    const {loggedIn} = useUser();

    return <ProtectedRoute element={element} condition={reverse ? !loggedIn : loggedIn} />

}

export default LoggedInRoute