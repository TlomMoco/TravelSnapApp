import { View, Text, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { FIREBASE_AUTH } from "../../firebase/FirebaseConfig";

type RouterProps = {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    return (
        <View className="flex-1 justify-center items-center">
            <TouchableOpacity className="bg-orange-500 py-2 rounded-lg items-center justify-center" onPress={()=> FIREBASE_AUTH.signOut()}>
                <Text className="text-white font-bold">Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default List;