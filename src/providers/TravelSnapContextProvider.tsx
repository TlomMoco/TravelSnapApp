import { createContext, ReactNode, useContext, useState } from "react";
import { ImageInfo } from "../model/data";

type ImageContextType = {
    currentImage: ImageInfo | null;
    imageUrls: string[];
    description: string;
    tags: string[];
    setCurrentImage: (image: ImageInfo | null) => void;
    setImageUrls: (urls: string[]) => void;
    setDescription: (desc: string) => void;
    setTags: (tag: string[]) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export const UseImageContext = () => useContext(ImageContext);

const TravelContextProvider = ({children} : {children: ReactNode}) => {
    const [currentImage, setCurrentImage] = useState<ImageInfo | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    return(
        <ImageContext.Provider
            value={{
                currentImage,
                imageUrls,
                description,
                tags,
                setCurrentImage,
                setImageUrls,
                setDescription,
                setTags,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};

export default TravelContextProvider;