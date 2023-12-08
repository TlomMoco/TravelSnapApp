import { Text, View, Image } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from "expo-media-library"
import { useState, useEffect, useRef } from 'react';
import Button from '../../components/CameraComponents/Button';
import { ImageUpload, UniqueId } from '../../components/CameraComponents/ImageUpload';
import { useImageContext } from '../../providers/TravelSnapContextProvider';

const CameraPage: React.FC = () => {

    // Benytte context til å sette image i homepage senere?
    const context = useImageContext();

    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [image, setImage] = useState<string | undefined>(undefined);
    const [type, setType] = useState<CameraType>(CameraType.back);
    const [flash, setFlash] = useState<FlashMode>(FlashMode.off);
    const [cam, setCam] = useState<Camera | null>(null)
    const cameraRef = useRef(cam)

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

                setImage(data?.uri)

                const id = UniqueId(data?.uri || "");
                const uploadURL = await ImageUpload(data?.uri || "", id)

                console.log(data)

                

                /*
                context?.setCurrentImage({
                    name: id,
                    date: new Date().toISOString(),
                    imageUri: uploadURL || "",
                });
                */

            } catch (error) {
                console.log(error)
            }
        }
    }

    const saveImage = async () => {
        if (image) {
            try {
                await MediaLibrary.createAssetAsync(image);
                alert("Picture saved to library!")
                setImage(undefined)
            } catch (error) {
                console.log(error)
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
            <Button icon="retweet" color="orange" onPress={() => setImage(undefined)} />
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
