import { View, Text, Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { FIREBASE_AUTH } from "../../firebase/FirebaseConfig";

type RouterProps = {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    return (
        <View className="flex-1 justify-center items-center">
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Sign out"/>
        </View>
    )
}

export default List;