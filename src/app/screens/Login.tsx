import { View, Text, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { useState } from "react";
import React from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput style={styles.input} 
            value={email}
            placeholder="Email" 
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}>

            </TextInput>
            <TextInput style={styles.input} 
            value={password}
            placeholder="Password" 
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}>

            </TextInput>

            { loading ? <ActivityIndicator size="large"/> 
            : <>
        
            </> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: "center"
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff"
    }
})

export default Login