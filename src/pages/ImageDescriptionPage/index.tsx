import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../model/data';
import { UseImageContext } from '../../providers/TravelSnapContextProvider';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebase/FirebaseConfig';
import { ImageUpload } from '../../components/CameraComponents/ImageUpload';
import { ActivityIndicator } from 'react-native';


// Use NativeStackScreenProps to simplify prop typing
type Props = NativeStackScreenProps<RootStackParamList, 'ImageDescriptionPage'>;


const ImageDescriptionPage: React.FC<Props> = () => {

    const context = UseImageContext();

    const { params } = useRoute<Props['route']>();
    const navigation = useNavigation();
    const { imageId, imageUrl } = params;
    const localUri = params.imageUrl; 

    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async () => {
      setLoading(true);
        try {
          const imageDocRef = doc(FIREBASE_DB, 'images', imageId);
          const downloadURL = await ImageUpload(localUri, imageId);

          context?.setCurrentImage({
            imageUri: downloadURL,
            uniqueId: imageId,
          });

          await setDoc(imageDocRef, {
            image: imageId,
            imageUrl: downloadURL,
            description: context?.description || '',
            tags: context?.tags,
          }, { merge: true });

          const updatedDoc = await getDoc(imageDocRef);
          const updatedTags = updatedDoc.exists() ? updatedDoc.data().tags || [] : [];
          context?.setTags({ ...context.tags, [imageUrl]: updatedTags });

          console.log('Details saved successfully!');
          navigation.goBack();
        } catch (error) {
          console.error('Error writing document to Firestore:', error);
        }finally{
          setLoading(false);
        }
      };


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
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-full items-center mt-10 bg-white/80 rounded-lg">
            <Text className="text-2xl m-5">Image Caption</Text>
            <Image source={{uri: context?.currentImage?.imageUri}} style={{width: 200, height: 200, borderRadius: 5}}/>
            <View className="w-full px-8 p-3">
              <TextInput
                className="mb-4 p-4 h-12 border border-gray-300 rounded-lg"
                placeholder="Enter description"
                onChangeText={context?.setDescription}
              />
              <TextInput
                className="mb-4 p-4 border border-gray-300 rounded-lg" placeholder="Enter tags (separate with ',')"
                onChangeText={(text) => {
                  const trimmedTags = text.split(',').map((tag) => tag.trim());
                  context?.setTags({
                    ...context.tags,
                    [imageUrl]: trimmedTags,
                  });
                }}
              />
              <TouchableOpacity
                onPress={handleSubmit}className="mb-4 bg-orange-500 py-2 rounded-lg flex items-center justify-center">
                <Text className="text-white text-lg">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
    );
};

export default ImageDescriptionPage;