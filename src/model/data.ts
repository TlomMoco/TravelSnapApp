
export type ImageInfo = {
    imageUri: string; 
    uniqueId: string;
    latitude?: number | null;
    longitude?: number | null;
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
    Login: undefined;
    Tabs: undefined;
    Home: undefined;
  
  };