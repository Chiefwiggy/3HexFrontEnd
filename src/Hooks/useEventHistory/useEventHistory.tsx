import React, {useContext} from 'react'
import {EventHistoryContext} from "./EventHistoryContext";

const useEventHistory = () => useContext(EventHistoryContext);

export default useEventHistory;


