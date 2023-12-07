import { StyleSheet, Text, View, Image } from 'react-native';

import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from "expo-media-library"
import { useState, useEffect, useRef, SetStateAction } from 'react';
import Button from '../../components/CameraComponents/Button';

const CameraPage: React.FC = () => {

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
            console.log(data)
            setImage(data?.uri)
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
    <View className="flex-1 bg-white justify-center">
      {!image ? (
        <Camera className="flex-1 rounded-lg" type={type} flashMode={flash} ref={cameraRef}>
          <View className="flex-row justify-between px-20">
            <Button icon={'retweet'} onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
            <Button color={flash === FlashMode.off ? 'gray' : '#f1f1f1'} icon={'flash'} onPress={() => setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off)} />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} className="flex-1 rounded-lg" />
      )}
      <View>
        {image ? (
          <View className="flex-row justify-between px-20">
            <Button title={'re-take picture'} icon="retweet" onPress={() => setImage(undefined)} />
            <Button title={'Save picture'} icon="check" onPress={saveImage} />
          </View>
        ) : (
          <Button title={'Take picture'} icon="camera" color='orange' onPress={takePicture}></Button>
        )}
      </View>
    </View>
  );
};

export default CameraPage;
