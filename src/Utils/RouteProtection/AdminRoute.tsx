import React from 'react';
import {Box} from "@mui/material";
import useUser from "../../Hooks/useUser/useUser";
import ProtectedRoute from "./ProtectedRoute";
import Page404 from "../../Components/Routing/Page404";

interface IAdminRouteInput {
    element: React.ReactElement;
}

const AdminRoute = ({element}: IAdminRouteInput) => {

    const {isReady, loggedIn, userPermissions } = useUser();

    return isReady ? (loggedIn && userPermissions.includes("admin") ? element : <Page404 />) : <></>
}

export default AdminRoute