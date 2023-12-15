import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { UseImageContext } from '../../providers/TravelSnapContextProvider';
import { useTheme } from '../../providers/ThemeContext'; 
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase/FirebaseConfig';

const HomePage: React.FC = () => {
  const context = UseImageContext();
  const storage = getStorage();

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
          const url = await getDownloadURL(imageRef);
          const docs = await getDoc(doc(FIREBASE_DB, "images", imageRef.name));
          const description = docs.exists() ? docs.data().description || "" : "";

          return { url, description }
        })
      );
      const urls = imageData.map((data) => data.url)
      const description = imageData.map((data) => data.description);

      context?.setImageUrls(urls);
      context?.setDescription(description)

      console.log(description)
      console.log("Urls: ", urls)
    } catch (error) {
      console.log("Something went wrong fetching images from db:", error)
    }
  }


  useEffect(() => {
    fetchImages();
  }, [context?.setImageUrls]);

  

  return (
    <View className={`flex-1 items-center justify-center ${backgroundColor}`}>

      <View className="mt-10 items-center justify-center">
        <Text className={`text-lg font-bold text-black color-white ${textColor}`}>Home Page</Text>
        <TextInput className={`m-5 p-1 px-20 bg-transparent border border-orange-400 rounded items-center content-center border-rounded ${textColor}`} placeholder="Search on tags..." placeholderTextColor={`${placeholderColor}`}/>
      </View>

      <View className="flex-1 ">
      <ScrollView>
          {context?.imageUrls.map((data, index) => (
            <View key={index} className="m-2 bg-orange-300 rounded text-right">
              <Image
                source={{ uri: data }}
                style={{ width: dimensions.width, height: dimensions.height, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
              />
              <Text className="px-3 py-2 text-stone-500 italic border-b border-dashed">Description:</Text>
              <Text className="font-bold p-3 py-5">
                {
                  context.description[index]
                }
                </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomePage;