import React from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import GeoLocationPage from "../pages/GeoLocationPage";
import HomePage from "../pages/HomePage";
import CameraPage from "../pages/CameraPage";
import SettingsPage from "../pages/SettingsPage";
import {IconName } from "../model/iconName";
import Ionicons from '@expo/vector-icons/Ionicons';


/*
    Referanse:
    Material Bottom Tabs Navigator API 
    https://reactnavigation.org/docs/material-bottom-tab-navig

    Referanse: 
    Icons 
    https://docs.expo.dev/guides/icons/#properties
*/

const Tab = createMaterialBottomTabNavigator();

const createTabOptions = (iconName: IconName) => ({
    tabBarIcon: () => (
      <Ionicons name= {iconName} color={"black"} size={26} />
    ),
  });

const TabsView = () => {
    return(
       <Tab.Navigator barStyle={{ backgroundColor: "#f97316"}}>
            <Tab.Screen 
                name="Home" 
                component={HomePage}
                options= {createTabOptions("home-outline")}
            ></Tab.Screen>
            <Tab.Screen   
                name="Geo location"
                component={GeoLocationPage}
                options={createTabOptions("globe-outline")}
            ></Tab.Screen>
            <Tab.Screen 
                name="Camera"
                component={CameraPage}
                options={createTabOptions("camera-outline")}
            ></Tab.Screen>
            <Tab.Screen 
                name="Settings" 
                component={SettingsPage}
                options={createTabOptions("settings-outline")}
            ></Tab.Screen>
       </Tab.Navigator>
    );
};

export default TabsView;