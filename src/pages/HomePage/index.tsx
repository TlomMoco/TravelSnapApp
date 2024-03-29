import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { UseImageContext } from '../../providers/TravelSnapContextProvider';
import { useTheme } from '../../providers/ThemeContext'; 
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../model/data';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HomePage: React.FC = () => {
  const context = UseImageContext();
  const storage = getStorage();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const { isDarkMode } = useTheme(); 
  const textColor = isDarkMode ? "text-white" : "text-black";
  const backgroundColor = isDarkMode ? "bg-black" : "bg-white"; 
  const placeholderColor = isDarkMode ? "#FFF" : "gray"

  const numColumns: number = 1

  const calculateImageDimensions = (columns: number, spacing: number): { width: number; height: number } => {
    const screenWidth = Dimensions.get('window').width;
    const totalSpacing = spacing * (columns);
    const imageWidth = (screenWidth - totalSpacing) / columns;
  
    const imageHeight = imageWidth;
  
    return { width: imageWidth, height: imageHeight };
  };
  const dimensions = calculateImageDimensions(numColumns, 40)

  const fetchImages = async () => {
    try {
      const imageRef = ref(storage, "images");
      const imageList = await listAll(imageRef);

      const imageData = await Promise.all(
        imageList.items.map(async (imageRef) => {
          console.log("ImageRefName:", imageRef.name);
          const url = await getDownloadURL(imageRef);
          const docs = await getDoc(doc(FIREBASE_DB, "images", imageRef.name));
          const description = docs.exists() ? docs.data().description || "" : "";
          const location = docs.exists() ? docs.data().location.coords : null;

          return { url, description, location }
        })
      );
      const description = imageData.map((data) => data.description);
      const urls = imageData.map((data) => data.url)
      const locations = imageData.map((data) => data.location);

      context?.setDescription(description)
      context?.setImageUrls(urls);
      context?.setLocation(locations)

    } catch (error) {
      console.log("Something went wrong fetching images from db:", error)
    }
  }


  useEffect(() => {
    fetchImages();
    
  }, [context?.currentImage]);



  return (
    <View className={`flex-1 items-center justify-center ${backgroundColor}`}>
  
      <View className="mt-10 items-center justify-center">
        <Text className={`text-lg font-bold text-black color-white ${textColor}`}>Home Page</Text>
        <TextInput className={`m-5 p-1 px-20 bg-transparent border border-orange-400 rounded items-center content-center border-rounded ${textColor}`} placeholder="Search on tags..." placeholderTextColor={`${placeholderColor}`}/>
      </View>
  
      <View className="flex-1 ">
        <ScrollView>
          {context?.imageUrls.map((data, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('ImageDetailPage', { 
                imageUrl: context?.imageUrls[index], 
                description: context?.description[index], 
                location: context?.location[index]
              })}
              className="m-2 bg-orange-300 rounded text-right"
            >
              <Image
                source={{ uri: data }}
                style={{ width: dimensions.width, height: dimensions.height, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
              />
              <Text className="px-3 py-2 text-stone-500 italic border-b border-dashed">Description:</Text>
              <Text className="font-bold p-3 py-5">
                {context.description[index]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
  
    </View>
  );
};

export default HomePage;