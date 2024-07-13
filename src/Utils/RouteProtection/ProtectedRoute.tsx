import React from 'react'
import {Box} from "@mui/material";
import {Navigate} from "react-router-dom";

interface IProtectedRouteInput {
    element: React.ReactElement,
    condition: boolean,
    reroute?: string
}

const ProtectedRoute = ({
    element,
    condition,
    reroute = "/"
}: IProtectedRouteInput) => {
    return condition ? element : <Navigate to={reroute} />
}

export default ProtectedRoute