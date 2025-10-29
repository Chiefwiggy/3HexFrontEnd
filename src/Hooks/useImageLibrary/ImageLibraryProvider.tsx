import React, {useEffect, useState} from 'react';
import {ImageLibraryContext} from "./ImageLibraryContext";
import useAPI from "../useAPI/useAPI";

export interface IImageLibraryContext {
    ImageLibrary: Record<string, IImageData>
    GetImageById: (id: string) => IImageData
    isImageLibraryLoaded: boolean
}

interface IImageLibraryProvider {
    children: any
}

export interface IImageData {
    imageUrl: string,
    imageKey: string,
    owner: string,
    altText?: string
}

const ImageLibraryProvider = ({children}: IImageLibraryProvider) => {

    const [ImageLibrary, setImageLibrary] = useState<Record<string, IImageData>>({});
    const [isImageLibraryLoaded, setIsImageLibraryLoaded] = useState(false);

    const API = useAPI();

    const GetImageById = (id: string): IImageData => {
        return ImageLibrary[id] || {
            imageKey: "noimagefound",
            imageUrl: "https://ursura-cdn.s3.us-east-2.amazonaws.com/6671f613ff40330239df60ff/placeholder/noimagefound.png",
            owner: ""
        }
    }

    useEffect(() => {
        (async() => {
            let rawData: Array<IImageData> = await API.ImageLibraryAPI.GetLibraryLedger()
            const imageLibrary: Record<string, IImageData> = rawData.reduce((acc: Record<string, IImageData>, item: IImageData) => {
                acc[item.imageKey] = {
                    imageUrl: item.imageUrl,
                    imageKey: item.imageKey,
                    altText: item.altText,
                    owner: item.owner
                };
                return acc;
            }, {} as Record<string, IImageData>);
            console.log(imageLibrary)
            setImageLibrary(imageLibrary)
            setIsImageLibraryLoaded(true);
        })();
    }, []);

    return <ImageLibraryContext.Provider value={{
        ImageLibrary,
        GetImageById,
        isImageLibraryLoaded
    }}>
        {children}
    </ImageLibraryContext.Provider>
}

export default ImageLibraryProvider