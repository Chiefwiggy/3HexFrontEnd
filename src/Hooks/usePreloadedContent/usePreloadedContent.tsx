import React, {useContext} from 'react';
import PreloadedCharacterContext from "./PreloadedContentContext"


const usePreloadedContent = () => useContext(PreloadedCharacterContext);

export default usePreloadedContent;