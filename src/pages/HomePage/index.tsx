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
          const tags = docs.exists() ? docs.data().tags || [] : [];

          return { url, tags }
        })
      );

      const urls = imageData.map((data) => data.url);
      const tagsMap: Record<string, string[]> = {};
      imageData.forEach((data) => {
        tagsMap[data.url] = data.tags;
      })

      console.log("Urls: ", urls)
      console.log("tags: ", tagsMap)

      context?.setImageUrls(urls);
      context?.setTags(tagsMap);

    } catch (error) {
      console.log("Something went wrong fetching images from db:", error)
    }
  }
  
  useEffect(() => {
   /* const getImages = async () => {
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
    };*/
    
    fetchImages();
    // getImages();
  }, [context?.setImageUrls, context?.setTags]);

  const { isDarkMode } = useTheme(); 
  const textColor = isDarkMode ? "text-white" : "text-black";
  const backgroundColor = isDarkMode ? "bg-black" : "bg-white"; 
  const placeholderColor = isDarkMode ? "#FFF" : "gray"

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
              <Text className="font-bold p-5">Tags: {Array.isArray(context?.tags[item]) ? context?.tags[item].join(', ') : Array.isArray(context?.tags[item]) ? context?.tags[item].join(', ') : 'No tags'}</Text>
            </View>
          )}
        />
      </View>

      <View className="items-center justify-center ">
        <TouchableOpacity className="m-2 p-4 bg-orange-500 py-2 rounded-lg items-center justify-center">
          <Text>Image-Picker</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default HomePage;