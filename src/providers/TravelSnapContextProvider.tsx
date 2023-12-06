import { 
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState 
} from "react"
import { ImageInfo } from "../data"



type ImageContextType = {
    currentImage: ImageInfo | null;
    setCurrentImage: (image: ImageInfo | null) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined)

export const useImageContext = () => useContext(ImageContext);

const TravelContextProvider = ({children} : {children: ReactNode}) => {
    const [currentImage, setCurrentImage] = useState<ImageInfo | null>(null);

    return(
        <ImageContext.Provider
            value={{
                currentImage,
                setCurrentImage
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};

export default TravelContextProvider;