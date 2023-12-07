import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

type buttonProps = {
    title?: string,
    onPress: () => void,
    icon: string,
    color?: string
};

const Button: React.FC<buttonProps> = ({title, onPress, icon, color = "#f1f1f1"}) => {

    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Entypo size={28} color={color ? color : "#f1f1f1"}></Entypo>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
};

export default Button;


const styles = StyleSheet.create({
    button: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 30
    },
    text: {
        fontWeight: "bold",
        fontSize: 16,
        color: "f1f1f1",
        marginLeft: 10
    }
})
