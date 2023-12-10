import { View, Text, TextInput, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import * as Font from 'expo-font'; 
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
    const [loading, setLoading] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false)
    const auth = FIREBASE_AUTH;
    
    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'FederalEscort-Regular': require('../../assets/fonts/federalescortscan.ttf'), 
            });
            setFontsLoaded(true);
        };

        loadFonts();
    }, []);
    
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

    if (!fontsLoaded) {
        return <ActivityIndicator />; 
    }


    return (
        <ImageBackground
            source={require('../../assets/images/BackroundLogin.png')}
            resizeMode="cover"
            className="flex-1"
        >
            <View className="flex-1 justify-center items-center px-6">
                <View className="w-full items-center mt-10 p-5 bg-white opacity-80 rounded-lg">
                    <Text  className="text-3xl font-bold text-center mb-4" style={{ fontFamily: 'FederalEscort-Regular' }}>TravelSnap</Text>
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