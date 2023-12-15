import React, { useCallback, useState, useEffect} from 'react';
import { View, Text, TextInput, Alert ,Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../model/data';
import { UseImageContext } from '../../providers/TravelSnapContextProvider';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase/FirebaseConfig';
import { ImageUpload } from '../../components/CameraComponents/ImageUpload';
import { ActivityIndicator } from 'react-native';
import *  as ImagePicker from "expo-image-picker";
import * as Location from 'expo-location';


/*
  Using Ecpo location API:
  Reference: https://docs.expo.dev/versions/latest/sdk/location/
*/


// Use NativeStackScreenProps to simplify prop typing
type Props = NativeStackScreenProps<RootStackParamList, 'ImageDescriptionPage'>;


const ImageDescriptionPage: React.FC<Props> = () => {

  const context = UseImageContext();

  const {params} = useRoute<Props['route']>();
  const navigation = useNavigation();
  const {imageId, imageUrl} = params;
  const localUri = params.imageUrl; 
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(imageUrl);

  const handleSubmit = async () => {
    setLoading(true);
      try {
        const imageUpload = currentImage || imageUrl;
        const downloadURL = await ImageUpload(localUri, imageId);
  
        if (imageUpload) {
          const imageDocRef = doc(FIREBASE_DB, 'images', imageId);

          await setDoc(imageDocRef, {
            imageId,
            imageUrl: downloadURL,
            description: context?.description,
            location: context?.location,
            
          }, {merge: true});

          context?.setCurrentImage({
            imageUri: imageUpload,
            uniqueId: imageId,
            
          });

          console.log("Image uploaded to backend");
          navigation.goBack();
        }else{
          console.log("No image to upload");
        }
        } catch (error){
          console.log("Error uploading image to database", error);
        }finally{
          setLoading(false);
        }
    };

  const getLibraryAccess= async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  };
  
  const uploadFromGallery = useCallback(async () => {
    const hasPermission = await getLibraryAccess();

    if (!hasPermission) {
      Alert.alert("Permission Required", "This app needs permission to access your photo library.");
      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!imageResult.canceled && imageResult.assets && imageResult.assets[0].uri) {
      setCurrentImage(imageResult.assets[0].uri);
      context?.setCurrentImage({
        imageUri: imageResult.assets[0].uri,
        uniqueId: imageId,
      });
    } else {
      console.log("No selection, canceled, or no image selected.");
    }
  }, [context, imageId]);

  const getLocationAccess = async () => {
    setLocationLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Required", "This app needs permission to access your location.");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    context?.setLocation([location]);
    console.log("Location:", location);
    setLocationLoading(false);
  }

    return (
      <ImageBackground
        source={require('../../assets/images/BackgroundForestDescription.png')}
        resizeMode="cover"
        className="flex-1"
      >
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
            <View className="flex-1 justify-center items-center px-6">
              <View className="w-full items-center mt-10 bg-white/80 rounded-lg">
                <Text className="text-2xl m-5">Add details</Text>
                {currentImage && (
                  <Image source={{ uri: currentImage }} style={{ width: 300, height: 350, borderRadius: 5 }} />
                )}
                <View className="w-full px-8 p-3">
                  <TouchableOpacity
                    onPress={uploadFromGallery}
                    className="mb-4 bg-orange-500 py-2 rounded-lg flex items-center justify-center"
                  >
                    <Text className="text-white text-lg">Upload from gallery</Text>
                  </TouchableOpacity>
                  {locationLoading ? (
                    <View className="mb-4 flex items-center justify-center">
                      <ActivityIndicator size="small" color="black" />
                      <Text className="text-black text-lg">Setting location...</Text>
                    </View>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={getLocationAccess}
                        className="mb-4 bg-orange-500 py-2 rounded-lg flex items-center justify-center"
                      >
                        <Text className="text-white text-lg">Set location</Text>
                      </TouchableOpacity>
                      <TextInput
                        className="mb-4 p-4 h-12 border border-gray-300 rounded-lg"
                        placeholder="Enter description"
                        onChangeText={(text) => context?.setDescription([text])}
                      />
                      <TouchableOpacity
                        onPress={handleSubmit}
                        className="mb-4 bg-orange-500 py-2 rounded-lg flex items-center justify-center"
                      >
                        <Text className="text-white text-lg">Submit</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </ImageBackground>
    );
};
export default ImageDescriptionPage;
