import { View, Text, TouchableOpacity, Switch, Image } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../providers/ThemeContext";
import { FIREBASE_AUTH, FIREBASE_STORAGE } from "../../firebase/FirebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "react-native-image-picker";

type RouterProps = {
    navigation: NavigationProp<any, any>;
}



const SettingsPage = ({ navigation }: RouterProps) => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white'; 

    const [userEmail, setUserEmail] = useState<String | null>(null);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    useEffect(() => {

        const fetchUserInfo = async () => {
        const user = FIREBASE_AUTH.currentUser;

            if (user) {
                setUserEmail(user.email);

                const storageRef = ref(FIREBASE_STORAGE, `profilePictures/${user.uid}.jpg`);
                
                try {
                    const url = await getDownloadURL(storageRef);
                    setProfilePicture(url)
                } catch (error) {
                    console.log("Error fetching profile-picture:", error);
                }
            }
        };

        fetchUserInfo();
    }, [setProfilePicture]);

    const selectProfilePicture = async () => {
        const { status } = await ImagePicker.launchImageLibrary({
            
        });

        if (status !== "granted") {
            alert("Not able to access camera roll due to permission. Give permission to gain access.");
            return;
        }
    }

    return (
        <View className={`flex-1 justify-center items-center px-4 ${backgroundColor}`}>

            <View className="mt-4">
                {userEmail && (
                    <Text className={`text-lg font-bold ${textColor}`}>{`Hello ${userEmail.split("@")[0]}`}</Text>
                )}

                {profilePicture && (
                    <Image source={{uri: profilePicture}} style={{width: 100, height: 100, borderRadius: 50}}/>
                )}
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
                className="bg-orange-500 mt-4 py-2 rounded-lg items-center justify-center"
                onPress={() => FIREBASE_AUTH.signOut()}
            >
                <Text className="text-white font-bold m-2 bg-orange-500 px-2 rounded-lg items-center justify-center">Sign out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SettingsPage;