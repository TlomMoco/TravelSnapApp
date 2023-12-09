import { FirebaseApp } from "firebase/app";
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from "../../firebase/FirebaseConfig";
import { FirebaseStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const UniqueId = (uri: string): string => {
    const filename = uri.split("/").pop()
    return filename || ""
}

export const ImageUpload = async (imageUri: string, id: string) => {
    try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        
        const storageRef = ref(FIREBASE_STORAGE, `images/${id}.jpg`);
        
        await uploadBytes(storageRef, blob)

        const downloadUrl = await getDownloadURL(storageRef)

        return downloadUrl

    } catch (error) {
        console.log("uploadBytes error", error)
        throw error
    }  
}