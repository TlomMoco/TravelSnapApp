import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";


type buttonProps = {
    title?: string,
    onPress: () => void,
    icon: keyof typeof Entypo.glyphMap,
    color?: string,
};

const Button: React.FC<buttonProps> = ({title, onPress, icon, color = "#f1f1f1"}) => {

    return(
        <TouchableOpacity onPress={onPress} className="h-20 flex-row items-center justify-center pb-5">
            <Entypo name={icon} size={28} color={color ? color : "#f1f1f1"}></Entypo>
            <Text className="font-bold text-lg text-black ml-3">{title}</Text>
        </TouchableOpacity>
    )
};

export default Button;

