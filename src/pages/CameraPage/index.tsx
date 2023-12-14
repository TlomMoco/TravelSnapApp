import { Text, View, Image } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from "expo-media-library"
import Button from '../../components/CameraComponents/Button';
import { useState, useEffect, useRef } from 'react';
import { UniqueId } from '../../components/CameraComponents/ImageUpload';
import { UseImageContext } from '../../providers/TravelSnapContextProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../model/data';

type CameraPageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CameraPage: React.FC = () => {

    const context = UseImageContext();

    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [image, setImage] = useState<string | undefined>(undefined);
    const [type, setType] = useState<CameraType>(CameraType.back);
    const [flash, setFlash] = useState<FlashMode>(FlashMode.off);
    const [cam, setCam] = useState<Camera | null>(null)

    const cameraRef = useRef(cam)
    const navigation = useNavigation<CameraPageNavigationProp>()


    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === "granted");
        })();
    }, []);

    const takePicture = async () => {
        if(cameraRef) {
            try {
                const data = await cameraRef.current?.takePictureAsync();
                
                context?.setCurrentImage({
                    imageUri: data?.uri || "",
                    uniqueId: UniqueId(data?.uri || "")
                })

                setImage(data?.uri);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                // Your existing image resize and upload logic
                const id = UniqueId(image);
                // Navigate to ImageDescriptionPage with imageUrl and imageId
                navigation.navigate('ImageDescriptionPage', {
                    imageUrl: image,
                    imageId: id,
                });

            } catch (error) {
                console.log("Error uploading image to firebase:", error);
            }
            try {
                await MediaLibrary.createAssetAsync(image);
                // Optionally, inform the user that the picture is saved
            } catch (error) {
                console.log("Error saving image to library", error);
            }
        }
    }

  if(hasCameraPermission === false){
    return <Text>No access to camera</Text>
  }

  return (
    <View className="flex-1 bg-white justify-center bg-transparent">
      {!image ? (
        <Camera className="flex-1" type={type} flashMode={flash} ref={cameraRef}>
          <View className="absolute top-0 left-0 right-0 flex-row justify-between p-12 px-16">
            <Button color="orange" icon={'retweet'} onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
            <Button color={flash === FlashMode.off ? "gray" : "orange"} icon={"flash"} onPress={() => setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off)} />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} className="flex-1" />
      )}
      <View className="absolute bottom-0 left-0 right-0">
        {image ? (
          <View className="flex-row justify-between px-16">
            <Button icon="retweet" color="orange" onPress={() => {setImage(undefined); context?.setCurrentImage(null)}} />
            <Button icon="check" color="orange" onPress={saveImage} />
          </View>
        ) : (
          <Button icon="camera" color="orange" onPress={takePicture}></Button>
        )}
      </View>
    </View>
  );
};

export default CameraPage;
