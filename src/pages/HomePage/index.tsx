import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const HomePage: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const storage = getStorage();

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

        setImageUrls(urls)

      } catch (error) {
        console.log("Something went wrong when fetching images from firebase:", error)
      }
    };

    getImages();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold text-black">HomePage Page</Text>
      <View className='flex-row'>
        <FlatList
          data = {imageUrls}
          keyExtractor = {(url) => url}
          renderItem = {({item}) => (
            <Image source={{uri: item}} style={{ width: 100, height: 100 }}/>
          )}
        />
      </View>
      {/* Legg til komponenter her*/}
    </View>
  );
};

export default HomePage;