import React from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import GeoLocationPage from "../pages/GeolocationPage";
import HomePage from "../pages/HomePage";
import CameraPage from "../pages/CameraPage"
import SettingsPage from "../pages/SettingsPage"

const Tab = createMaterialBottomTabNavigator();



const TabsView = () => {
    return(
       <Tab.Navigator>
            <Tab.Screen name="Home" component={HomePage}></Tab.Screen>
            <Tab.Screen name="Geo location" component={GeoLocationPage}></Tab.Screen>
            <Tab.Screen name="Camera" component={CameraPage}></Tab.Screen>
            <Tab.Screen name="Settings" component={SettingsPage}></Tab.Screen>
       </Tab.Navigator>
    );
};

export default TabsView;