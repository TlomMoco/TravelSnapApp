import { View, Text, TextInput, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";
import { useState } from "react";
import React from "react";
import { FIREBASE_AUTH } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

/*
    Referanse:
    Super Easy React Native AUTHENTICATION with Firebase - Simon Grim (09.05.2023)
    https://www.youtube.com/watch?v=ONAVmsGW6-M&ab_channel=SimonGrimm
*/

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
        <ImageBackground
            source={require('../../assets/images/login.png')}
            resizeMode="cover"
            className="flex-1"
        >
            <View className="flex-1 justify-center items-center">
                <View className="w-full items-center mt-30 p-5 bg-white bg-opacity-50 rounded-lg">
                    <Text className="text-4xl font-bold text-center mb-4">Welcome to Travel App</Text>
                    <KeyboardAvoidingView behavior="padding" className="w-full px-8">
                        <TextInput 
                            className="mb-4 p-4 h-12 border border-gray-300 rounded-lg"
                            value={email}
                            placeholder="Email"
                            autoCapitalize="none"
                            onChangeText={setEmail}
                        />
                        <TextInput 
                            className="mb-4 p-4 h-12 border border-gray-300 rounded-lg"
                            value={password}
                            placeholder="Password"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                        />
                        {loading ? (
                            <ActivityIndicator size="large" className="my-4" />
                        ) : (
                            <>
                                <TouchableOpacity
                                    onPress={signIn}
                                    className="mb-4 bg-orange-500 py-2 rounded-lg items-center justify-center"
                                >
                                    <Text className="text-white font-bold">Sign in</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={signUp}
                                    className="bg-orange-500 py-2 rounded-lg items-center justify-center"
                                >
                                    <Text className="text-white font-bold">Create user</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </KeyboardAvoidingView>
                </View>
            </View>
        </ImageBackground>
    );
};


export default Login;