import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image, Alert } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useTheme } from "../../providers/ThemeContext";
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "../../firebase/FirebaseConfig";
import { ref, getDownloadURL, uploadBytes} from "firebase/storage";
import *  as ImagePicker from "expo-image-picker";

/*
    For reference, used Expo docs for ImagePicker:
    https://docs.expo.dev/versions/latest/sdk/imagepicker/
*/

type RouterProps = {
  navigation: NavigationProp<any, any>;
};

const SettingsPage = ({ navigation }: RouterProps) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const textStyle = isDarkMode ? 'text-white' : 'text-black';
  const backgroundStyle = isDarkMode ? 'bg-black' : 'bg-white'; 

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null);
  const currentUser = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    const retrieveUserProfile = async () => {
      if (currentUser) {
        setUserEmail(currentUser.email);
        const storageRef = ref(FIREBASE_STORAGE, `profilePictures/${currentUser.uid}.jpg`);
        try {
          const url = await getDownloadURL(storageRef);
          setUserProfilePicture(url);
        } catch (error) {
          if (error === 'storage/object-not-found') {
            console.log("No picture or not set yet");
          } else {
            console.log("Error trying to get user profile picture:", error);
          }
        }
      }
    };
    retrieveUserProfile();
  }, []);

  const getLibraryAccess= async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  };


  const selectProfilePicture = useCallback(async () => {
    const currentUser = FIREBASE_AUTH.currentUser as any; 
    const hasPermission = await getLibraryAccess();
    const storageRef = ref(FIREBASE_STORAGE, `profilePictures/${currentUser.uid}.jpg`);

    if (!hasPermission) {
      Alert.alert("Need permission for access to the library");
      return;
    }
    
    let imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (imageResult.canceled || !imageResult.assets || !imageResult.assets[0].uri) {
        console.log("No seleection or canceled or no image selected.")
      return;
    }
  
    console.log("Profile image:", imageResult.assets[0].uri);
  
    const response = await fetch(imageResult.assets[0].uri);
    const blob = await response.blob();

  
    try {
      console.log("Loading profile image");
      await uploadBytes(storageRef, blob);
      console.log("Upload DONE");
      const url = await getDownloadURL(storageRef);
      setUserProfilePicture(url);
      console.log("Profile image DONE, url:", url);
    } catch (error) {
      console.log("Error with setting profile:", error);
    }
  }, []);



  return (
    <View className={`flex-1 p-4 justify-between ${backgroundStyle}`}>
      <View className="w-full">
        {/* Padding at the top for spacing */}
        <View className="pt-12" />
  
        <View className="flex-row items-center justify-start w-full px-4">
          {userProfilePicture ? (
            <Image source={{ uri: userProfilePicture }} className="w-24 h-24 rounded-full" />
          ) : (
            <View className="w-24 h-24 rounded-full bg-gray-300 justify-center items-center">
              <Text className="text-xl text-white">No image</Text>
            </View>
          )}
  
          {userEmail && (
            <Text className={`text-lg font-bold ml-4 ${textStyle}`}>{`Hello ${userEmail.split("@")[0]}`}</Text>
          )}
        </View>
  
        <TouchableOpacity
          className="bg-orange-500 py-5 mt-10 mb-5 rounded-lg w-full"
          onPress={selectProfilePicture}
        >
          <Text className="text-white font-bold text-center ${textStyle}">Add Image</Text>
        </TouchableOpacity>
  
        <View className="flex-row items-center justify-between px-4 py-10">
          <Text className={`text-lg font-bold ${textStyle}`}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#151512" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
      </View>
  
      {/* Position sign out at the bottom */}
      <TouchableOpacity
        className="bg-red-500 py-2 px-4 rounded-lg w-full mb-4"
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Text className= "text-white font-bold text-center">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsPage;

