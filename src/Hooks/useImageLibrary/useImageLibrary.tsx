import {ImageLibraryContext} from "./ImageLibraryContext";
import {useContext} from 'react'

const useImageLibrary = () => useContext(ImageLibraryContext);

export default useImageLibrary;