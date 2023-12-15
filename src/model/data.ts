
export type ImageInfo = {
    imageUri: string; 
    uniqueId: string;
    location?: number | null;
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
      imageId: string;
    };
    Login: undefined;
    Tabs: undefined;
    Home: undefined;
  
  };