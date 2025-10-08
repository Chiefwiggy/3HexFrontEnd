import {createContext} from 'react'
import { IImageLibraryContext } from './ImageLibraryProvider'

export const ImageLibraryContext = createContext<IImageLibraryContext>({
    ImageLibrary: {},
    GetImageById: (id: string) => {
        return {
            imageKey: "undefined",
            imageUrl: "",
            owner: ""
        }
    }
});

