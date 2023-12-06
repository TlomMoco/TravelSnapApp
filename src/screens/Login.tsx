import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import React from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;
    
    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Check your email")
        } catch (error) {
            console.log(error)
            alert("Sign in failed: " + error)
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert("Check your email")
        } catch (error) {
            console.log(error)
            alert("Sign in failed: " + error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <KeyboardAvoidingView behavior="padding">
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

            { loading ? (<ActivityIndicator size="large"/> 
            ) : (
            <>
                <Button title="Login" onPress={signIn}/>
                <Button title="Create user" onPress={signUp}/>
            </> 
            )}
            </KeyboardAvoidingView>
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