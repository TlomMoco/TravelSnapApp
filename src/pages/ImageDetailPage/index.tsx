import React from 'react';
import { View, Text, Image, ScrollView, ImageBackground} from 'react-native';
import { RootStackParamList } from '../../model/data';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Mapview, { Marker } from 'react-native-maps';


type Props = NativeStackScreenProps<RootStackParamList, 'ImageDetailPage'>;

const ImageDetailPage = ({route} : Props) => {
  const { imageUrl, description, location } = route.params; 
  const coordinates = location?.coords;


  return (
    <ImageBackground source={require('../../assets/images/BackgroundForestDetail.png')} resizeMode='cover' className='flex-1'>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center"}}>
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-full items-center mt-10 bg-white/80 rounded-lg">
            <Text className="text-2xl m-5"> Details</Text>
            <Image source={{ uri: imageUrl }} style={{ width: 300, height: 350, borderRadius: 5 }}/>
            <Text className="px-3 py-2 text-stone-500 italic border-b border-dashed">Description:</Text>
            <Text className="font-bold p-3 py-5">{description}</Text>
            {coordinates && (
              <Mapview className="h-50 w-full rounded-lg mt-5"
                initialRegion={{
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                  }}
                  title={"Image location"}
                  description={description}
                />
              </Mapview>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ImageDetailPage;
