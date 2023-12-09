import { createContext, ReactNode, useContext, useState } from "react";
import { ImageInfo } from "../model/data";

type ImageContextType = {
    currentImage: ImageInfo | null;
    imageUrls: string[];
    setCurrentImage: (image: ImageInfo | null) => void;
    setImageUrls: (urls: string[]) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export const UseImageContext = () => useContext(ImageContext);

const TravelContextProvider = ({children} : {children: ReactNode}) => {
    const [currentImage, setCurrentImage] = useState<ImageInfo | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    return(
        <ImageContext.Provider
            value={{
                currentImage,
                imageUrls,
                setCurrentImage,
                setImageUrls,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};

export default TravelContextProvider;