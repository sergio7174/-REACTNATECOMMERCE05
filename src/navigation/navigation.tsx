/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import SignInScreen from "../screens2/SignInScreen";
import SignUpScreen from "../screens2/sign-up"
import { RootStackParamList } from "../../types";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo";
import * as SplashScreen from "expo-splash-screen";

import MainNavigation from "./HomeNavigation";


export default function Navigation() {
  return (
    <NavigationContainer> 
     <RootNavigator />
    </NavigationContainer>
  );
}

const stack:any = createNativeStackNavigator<RootStackParamList>();

/**
 * Read more about the protected routes pattern in React Native
 *
 * https://reactnavigation.org/docs/auth-flow
 */
const RootNavigator = () => {
  const { isSignedIn, isLoaded } = useUser();
  
  React.useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  return (
    <ClerkLoaded>
      <stack.Navigator>
        {isSignedIn ? (
          <stack.Screen
            name="MainNavigation"
            component={MainNavigation}
            options={{ title: "MainNavigation" }}
          />
          

        ) : (
          <>
           
            <stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ title: "Sign In" }}
            />
             <stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: "Sign Up" }}
            />
           
          </>
        )}
      </stack.Navigator>
    </ClerkLoaded>
  );
};
