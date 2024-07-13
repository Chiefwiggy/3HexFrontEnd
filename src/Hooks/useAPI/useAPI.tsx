import React, {useContext} from 'react'
import {APIContext} from "./APIContext";

const useAPI = () => useContext(APIContext);
export default useAPI;