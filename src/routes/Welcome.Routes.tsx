import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsView from "././index";
import Login from "../pages/LoginPage";
import { User, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { FIREBASE_AUTH } from "../firebase/FirebaseConfig";
import ImageDescriptionPage from "../pages/ImageDescriptionPage";
import { RootStackParamList } from "../model/data";
import ImageDetailPage from "../pages/ImageDetailPage";

const Stack = createNativeStackNavigator<RootStackParamList>();


const WelcomeRoutes: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log("user", user);
        setUser(user);
      }); 
      
      return unsubscribe;
    }, []);
  
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          { user ? (
            // If user is logged in, the tabsview rendered
            <Stack.Group>
             <Stack.Screen name="Tabs" component={TabsView}  options={{headerShown: false}} ></Stack.Screen>
             <Stack.Screen name="ImageDescriptionPage" component={ImageDescriptionPage} options={{headerShown: false}}></Stack.Screen>
             <Stack.Screen name="ImageDetailPage" component={ImageDetailPage} options={{headerShown: false}}></Stack.Screen>
            </Stack.Group>
          ) : (
            // If no user, loggin is rendered 
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          )}
        </Stack.Navigator>

      </NavigationContainer>
    );
}

export default WelcomeRoutes;
