import { View, Text, Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { FIREBASE_AUTH } from "../firebase/FirebaseConfig";

type RouterProps = {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    return (
        <View>
            <Button onPress={() => navigation.navigate("Details")} title="Open details"/>
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Sing out"/>
        </View>
    )
}

export default List;