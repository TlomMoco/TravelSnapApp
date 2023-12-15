import * as Location from 'expo-location';

export type ImageInfo = {
    imageUri: string; 
    uniqueId: string;
    location?: number;
}

type ImageContextType = {
    currentImage: ImageInfo | null;
    imageUrls: string[];
    setCurrentImage: (image: ImageInfo | null) => void;
    setImageUrls: (urls: string[]) => void;
}

export type RootStackParamList = {
    ImageDescriptionPage: {
      imageUrl: string;
      imageId: string;
    };
    ImageDetailPage: {
      imageUrl: string;
      description: string;
      location?: Location.LocationObject;
    };
    Login: undefined;
    Tabs: undefined;
    Home: undefined;
  
  };