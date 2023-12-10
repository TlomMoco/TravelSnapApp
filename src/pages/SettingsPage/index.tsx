import { View, Text, TouchableOpacity, Switch } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { useTheme } from "../../providers/ThemeContext";
import { FIREBASE_AUTH } from "../../firebase/FirebaseConfig";

type RouterProps = {
    navigation: NavigationProp<any, any>;
}


const List = ({ navigation }: RouterProps) => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const textColor = isDarkMode ? 'text-white' : 'text-black';
    const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white'; 

    return (
        <View className={`flex-1 justify-center items-center px-4 ${backgroundColor}`}>
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
                <Text className="text-white font-bold">Sign out</Text>
            </TouchableOpacity>
        </View>
    );
}

export default List;