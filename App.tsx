import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import TravelContextProvider from "./src/providers/TravelSnapContextProvider";
import WelcomeRoutes from "./src/routes/Welcome.Routes";
import { Provider as PaperProvider } from 'react-native-paper';



export default function App() {
  const {height} = useWindowDimensions()

// Test to see If we need <PaperProvider></PaperProvider>
  return (
    <TravelContextProvider>
      <PaperProvider>
        <WelcomeRoutes/>
      </PaperProvider>
    </TravelContextProvider>
  );
}
