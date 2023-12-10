import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import TravelContextProvider from "./src/providers/TravelSnapContextProvider";
import WelcomeRoutes from "./src/routes/Welcome.Routes";
import { ThemeProvider } from "./src/providers/ThemeContext";



export default function App() {
  const {height} = useWindowDimensions()

  return (
    
      <TravelContextProvider>
        <ThemeProvider>
          <WelcomeRoutes/>
        </ThemeProvider>
      </TravelContextProvider>
    
  );
}
