import React from "react";
import { View, Text } from "react-native";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import GeoLocationPage from "../pages/GeoLocationPage";
import HomePage from "../pages/HomePage";

const Tab = createMaterialBottomTabNavigator();



const TabsView = () => {
    return(
       <Tab.Navigator>
            <Tab.Screen name="Home" component={HomePage}></Tab.Screen>
            <Tab.Screen name="Geo location" component={GeoLocationPage}></Tab.Screen>
       </Tab.Navigator>
    );
};

export default TabsView;