import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/Login";
import List from "../screens/List";
import Details from "../screens/Details";
import { User, onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { FIREBASE_AUTH } from "../firebase/FirebaseConfig";


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
    return (
      <InsideStack.Navigator>
        <InsideStack.Screen name="List" component={List}/>
        <InsideStack.Screen name="Details" component={Details}/>
      </InsideStack.Navigator>
    )
}

const WelcomeRoutes: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
  
    useEffect(() => {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log("user", user);
        setUser(user);
      })
    }, []);
  
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          { user ? (
            <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown: false}}/>
          ) : (
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default WelcomeRoutes;
