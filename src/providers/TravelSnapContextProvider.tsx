import { createContext, ReactNode, useContext, useState } from "react";
import { ImageInfo } from "../model/data";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebase/FirebaseConfig";
import * as Location from 'expo-location';

type ImageContextType = {
    currentImage: ImageInfo | null;
    imageUrls: string[];
    description: string[];
    location: Location.LocationObject[];
    setCurrentImage: (image: ImageInfo | null) => void;
    setImageUrls: (urls: string[]) => void;
    setDescription: (desc: string[]) => void;
    getCurrentDescription: () => void;
    setFireStoreValues: (desc: string[]) => void;
    setLocation: (location: Location.LocationObject[]) => void;
};


const ImageContext = createContext<ImageContextType | undefined>(undefined)

export const UseImageContext = () => useContext<ImageContextType | undefined>(ImageContext);

const TravelContextProvider = ({children} : {children: ReactNode}) => {
    const [currentImage, setCurrentImage] = useState<ImageInfo | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [description, setDescription] = useState<string[]>([]);
    const [location, setLocation] = useState<Location.LocationObject[]>([]);

    const getCurrentDescription = async () => {
            if(currentImage){
                const imageId = currentImage.uniqueId;

                const imagesDocRef = doc(FIREBASE_DB, "images", imageId);
                const imageDocSnapshot = await getDoc(imagesDocRef)

                if(imageDocSnapshot.exists()){
                    const fetchDescription = imageDocSnapshot.data().description;
                    
                    setDescription(fetchDescription);

                    return fetchDescription;
                }
            }
        return "";
    }
    
    const setFireStoreValues = async (desc: string[]) => {
        setDescription(desc)

        if(currentImage){
            const imageId = currentImage.uniqueId;
            const imageDocRef = doc(FIREBASE_DB, 'images', imageId);
            try{
                await setDoc(imageDocRef, {
                    image: imageId,
                    imageUrl: currentImage.imageUri,
                    description: desc || '',
                    location: currentImage.location,
                }, { merge: true });

                console.log('Details saved successfully!');
            } catch (error) {
                console.error('Error writing document to Firestore:', error);
            }
        }
    }

    return(
        <ImageContext.Provider
            value={{
                currentImage,
                imageUrls,
                description,
                location,
                setCurrentImage,
                setImageUrls,
                setDescription,
                getCurrentDescription,
                setFireStoreValues,
                setLocation,
            }}
        >
            {children}
        </ImageContext.Provider>
    );
};

export default TravelContextProvider;