import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image, Alert } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useTheme } from "../../providers/ThemeContext";
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "../../firebase/FirebaseConfig";
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
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
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white'; 

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        setUserEmail(user.email);
        const storageRef = ref(FIREBASE_STORAGE, `profilePictures/${user.uid}.jpg`);
        try {
          const url = await getDownloadURL(storageRef);
          setProfilePicture(url);
        } catch (error) {
          if (error as any === 'storage/object-not-found') {
            // Handle the case where the profile picture does not exist
            console.log("Profile picture not found, user might not have set it yet.");
          } else {
            // Handle other errors
            console.log("Error fetching profile-picture:", error);
          }
        }
      }
    };
    fetchUserInfo();
  }, []);

  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  };

  const selectProfilePicture = useCallback(async () => {
    const hasPermission = await getPermission();
    if (!hasPermission) {
      Alert.alert("Permission required");
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (result.canceled || !result.assets || !result.assets[0].uri) {
      console.log("Image selection canceled or no image selected.");
      return;
    }
  
    console.log("Image selected:", result.assets[0].uri);
  
    const response = await fetch(result.assets[0].uri);
    const blob = await response.blob();
    const user = FIREBASE_AUTH.currentUser;
  
    if (!user) {
      console.log("No user is signed in.");
      return;
    }
  
    const storageRef = ref(FIREBASE_STORAGE, `profilePictures/${user.uid}.jpg`);
  
    try {
      // Attempt to delete the existing image
      await deleteObject(storageRef);
      console.log("Existing profile picture deleted.");
    } catch (error: any) {
      if ('code' in error && error.code === 'storage/object-not-found') {
        console.log("Profile picture not found, might not have been set yet.");
      } else {
        console.log("Error deleting old profile picture:", error);
        return;
      }
    }
  
    try {
      console.log("Uploading new image...");
      await uploadBytes(storageRef, blob);
      console.log("New image uploaded successfully.");
  
      console.log("Fetching download URL...");
      const url = await getDownloadURL(storageRef);
      setProfilePicture(url);
      console.log("Profile picture URL set:", url);
    } catch (error) {
      console.log("Error uploading new profile picture:", error);
    }
  }, []);



  return (
    <View className={`flex-1 justify-center items-center px-4 ${backgroundColor}`}>
      <View className="mt-4">
        {userEmail && (
          <Text className={`text-lg font-bold ${textColor}`}>{`Hello ${userEmail.split("@")[0]}!`}</Text>
        )}

        {profilePicture && (
          <Image source={{ uri: profilePicture }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        )}

        <TouchableOpacity
          className="bg-blue-500 mt-4 py-2 rounded-lg items-center justify-center"
          onPress={selectProfilePicture}
        >
          <Text className={`${textColor} font-bold`}>Add profile picture</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-between w-full px-4 py-2">
        <Text className={`text-gray-800 font-bold ${textColor}`}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#151512" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>

      <TouchableOpacity
        className="bg-red-500 mt-4 py-2 rounded-lg items-center justify-center"
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Text className="text-white font-bold m-2 px-2 rounded-lg items-center justify-center">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsPage;

