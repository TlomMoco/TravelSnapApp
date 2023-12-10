import React, { createContext, ReactNode, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  };
  
  const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
  
  export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };
  
  export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
    useEffect(() => {
      const loadThemePreference = async () => {
        try {
          const value = await AsyncStorage.getItem('isDarkMode');
          if (value !== null) {
            setIsDarkMode(value === 'true');
          }
        } catch (error) {
          console.error('AsyncStorage error: ', (error as Error).message);
        }
      };
  
      loadThemePreference();
    }, []);
  
    const toggleDarkMode = async () => {
      try {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        await AsyncStorage.setItem('isDarkMode', JSON.stringify(newIsDarkMode));
      } catch (error) {
        console.error('AsyncStorage error: ', (error as Error).message);
      }
    };
  
    return (
      <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        {children}
      </ThemeContext.Provider>
    );
  };