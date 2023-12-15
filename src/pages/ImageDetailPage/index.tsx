import React from 'react';
import { View, Text, Image, ScrollView} from 'react-native';
import { RootStackParamList } from '../../model/data';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'ImageDetailPage'>;


const ImageDetailPage = ({route} : Props) => {
  const { imageUrl, description } = route.params; 
  console.log("Image Url: ", imageUrl)
  

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
        <View className='flex-1 justify-center items-center'>
          <Text>Image Detail Page</Text>
          <Image source={{ uri: imageUrl}} />
          <Text>{description}</Text>
        </View>
      </ScrollView>
  );
};

export default ImageDetailPage;
