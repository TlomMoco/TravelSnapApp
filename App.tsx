import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import TravelContextProvider from "./src/providers/TravelSnapContextProvider";
import WelcomeRoutes from "./src/routes/Welcome.Routes";
import { Provider as PaperProvider } from 'react-native-paper';



export default function App() {
  const {height} = useWindowDimensions()


  return (
    <TravelContextProvider>
      <PaperProvider>
        <WelcomeRoutes/>
      </PaperProvider>
    </TravelContextProvider>
  );
}
