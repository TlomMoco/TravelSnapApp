import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsView from "././index";
import Login from "../pages/LoginPage";
import List from "../pages/SettingsPage";
import { User, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { FIREBASE_AUTH } from "../firebase/FirebaseConfig";





const Stack = createNativeStackNavigator();

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
