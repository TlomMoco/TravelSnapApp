import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { UseImageContext } from '../../providers/TravelSnapContextProvider';
import { useTheme } from '../../providers/ThemeContext'; 

const HomePage: React.FC = () => {
  const context = UseImageContext();
  const storage = getStorage();
  const numColumns: number = 2

  const calculateImageDimensions = (columns: number, spacing: number): { width: number; height: number } => {
    const screenWidth = Dimensions.get('window').width;
    const totalSpacing = spacing * (columns - 1);
    const imageWidth = (screenWidth - totalSpacing) / columns;
  
    const imageHeight = imageWidth;
  
    return { width: imageWidth, height: imageHeight };
  };
  const dimensions = calculateImageDimensions(numColumns, 40)

  
  useEffect(() => {
    const getImages = async () => {
      try{
        const imageRef = ref(storage, "images");
        const imageList = await listAll(imageRef);

        const urls = await Promise.all(
          imageList.items.map(async (imageRef) => {
            const url = await getDownloadURL(imageRef);
            return url
          })
        );
        
        context?.setImageUrls(urls)

      } catch (error) {
        console.log("Something went wrong when fetching images from firebase:", error)
      }
    };

    getImages();
  }, [context?.setImageUrls]);

  const { isDarkMode } = useTheme(); 
  const textColor = isDarkMode ? "text-white" : "text-black";
  const backgroundColor = isDarkMode ? "bg-black" : "bg-white"; 
  const placeholderColor = isDarkMode ? "#FFF" : "gray"

  return (
    <View className={`flex-1 items-center justify-center ${backgroundColor}`}>
      <View className="mt-10 items-center justify-center">
        <Text className={`text-lg font-bold text-black color-white ${textColor}`}>Home Page</Text>
        <TextInput className={`m-5 p-1 px-20 bg-transparent border border-gray-300 rounded items-center content-center border-rounded ${textColor}`} placeholder="Search on tags..." placeholderTextColor={`${placeholderColor}`}/>
      </View>
      <View className="flex-1 ">
        <FlatList
          key={numColumns.toString()}
          data = {context?.imageUrls}
          keyExtractor = {(url) => url}
          numColumns={numColumns}
          renderItem = {({item}) => (
            <View className="m-0.5 items-center justify-center bg-[#E8DEF8] rounded">
              <Image source={{uri: item}} style={{ width: dimensions.width, height: dimensions.height, borderTopLeftRadius: 5, borderTopRightRadius: 5}}/>
              <Text className="font-bold p-1">{}</Text>
            </View>
          )}
        />
      </View>
      <View>
        <TouchableOpacity className="m-4 p-4 bg-orange-500 py-2 rounded-lg items-center justify-center">
          <Text>Her skal vi ha image-picker</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;