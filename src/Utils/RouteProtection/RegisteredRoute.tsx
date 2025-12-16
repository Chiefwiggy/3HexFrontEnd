import React from 'react';
import {Box} from "@mui/material";
import useUser from "../../Hooks/useUser/useUser";
import Page404 from "../../Components/Routing/Page404";

interface IRegisteredRouteInput {
    element: React.ReactElement;
}

const RegisteredRoute = ({element}: IRegisteredRouteInput) => {
    const {isReady, loggedIn, userPermissions } = useUser();

    return isReady ? (loggedIn && userPermissions.includes("registered") ? element : <Page404 />) : <></>
}

export default RegisteredRoute