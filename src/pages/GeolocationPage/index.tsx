import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../providers/ThemeContext'; 

const GeoLocationPage = () => {
  const { isDarkMode } = useTheme(); 

 
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const backgroundColor = isDarkMode ? 'bg-black' : 'bg-white'; 

  return (
    <View className={`flex-1 items-center justify-center ${backgroundColor}`}>
      <Text className={`text-lg font-bold ${textColor}`}>GeoLocation Page</Text>
      {/* Legg til komponenter her*/}
    </View>
  );
};

export default GeoLocationPage;