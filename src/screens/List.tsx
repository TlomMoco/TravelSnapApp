import { View, Text, Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";

type RouterProps = {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    return (
        <View>
            <Button onPress={() => navigation.navigate("details")} title="Open details"/>
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Sing out"/>
        </View>
    )
}

export default List;