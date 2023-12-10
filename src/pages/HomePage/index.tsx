import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { UseImageContext } from '../../providers/TravelSnapContextProvider';

const HomePage: React.FC = () => {
  const context = UseImageContext();
  const storage = getStorage();
  const numColumns: number = 3

  const calculateImageDimensions = (columns: number, spacing: number): { width: number; height: number } => {
    const screenWidth = Dimensions.get('window').width;
    const totalSpacing = spacing * (columns - 1);
    const imageWidth = (screenWidth - totalSpacing) / columns;
  
    const imageHeight = imageWidth;
  
    return { width: imageWidth, height: imageHeight };
  };
  const dimensions = calculateImageDimensions(numColumns, 10)

  
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



  return (
    <View className="flex-1 items-center justify-center bg-[#151512]">
      <Text className="text-lg font-bold text-black color-white">HomePage Page</Text>
      <View className="flex-row ">
        <FlatList
          key={numColumns.toString()}
          data = {context?.imageUrls}
          keyExtractor = {(url) => url}
          numColumns={numColumns}
          renderItem = {({item}) => (
            <View className="m-0.5 items-center justify-center bg-[#E8DEF8] rounded">
              <Image source={{uri: item}} style={{ width: dimensions.width, height: dimensions.height, borderTopLeftRadius: 5, borderTopRightRadius: 5}}/>
              <Text className="font-bold p-1">Caption</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HomePage;