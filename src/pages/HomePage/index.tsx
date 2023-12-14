import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { UseImageContext } from '../../providers/TravelSnapContextProvider';
import { useTheme } from '../../providers/ThemeContext'; 
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase/FirebaseConfig';

const HomePage: React.FC = () => {
  const context = UseImageContext();
  const storage = getStorage();
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
          const descriptions = docs.exists() ? docs.data().description || "" : "";

          return { url, descriptions }
        })
      );
      const urls = imageData.map((data) => data.url);

      console.log("Urls: ", urls);
      context?.setImageUrls(urls);

    } catch (error) {
      console.log("Something went wrong fetching images from db:", error)
    }
  }
  
  useEffect(() => {    
    fetchImages();
  }, [context?.setImageUrls]);

  const { isDarkMode } = useTheme(); 
  const textColor = isDarkMode ? "text-white" : "text-black";
  const backgroundColor = isDarkMode ? "bg-black" : "bg-white"; 
  const placeholderColor = isDarkMode ? "#FFF" : "gray"

  const descriptions: { [url: string]: string }[] = context?.description || [];

  console.log("Desc", descriptions)

  return (
    <View className={`flex-1 items-center justify-center ${backgroundColor}`}>

      <View className="mt-10 items-center justify-center">
        <Text className={`text-lg font-bold text-black color-white ${textColor}`}>Home Page</Text>
        <TextInput className={`m-5 p-1 px-20 bg-transparent border border-orange-400 rounded items-center content-center border-rounded ${textColor}`} placeholder="Search on tags..." placeholderTextColor={`${placeholderColor}`}/>
      </View>

      <View className="flex-1 ">
        <FlatList
          key={numColumns.toString()}
          data = {context?.imageUrls}
          keyExtractor = {(url) => url}
          numColumns={numColumns}
          renderItem = {({item}) => (
            <View className="m-2 items-center justify-center bg-orange-300 rounded">
              <Image source={{uri: item}} style={{ width: dimensions.width, height: dimensions.height, borderTopLeftRadius: 5, borderTopRightRadius: 5}}/>
              <Text className="font-bold p-5">Description:</Text>
              {descriptions
                .filter((desc) => desc[item]) // Filter descriptions based on the item
                .map((desc) => (
                  <Text key={item} style={{ marginBottom: 5 }}>{desc[item]}</Text>
                ))}
            </View>
          )}
        />
      </View>

      <View className="items-center justify-center ">
        <TouchableOpacity className="m-2 p-4 bg-orange-500 py-2 rounded-lg items-center justify-center">
          <Text className="text-white font-bold">Image-Picker</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default HomePage;