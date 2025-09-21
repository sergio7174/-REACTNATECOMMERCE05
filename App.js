// file: App.js
// @clerk/clerk-expo is the official Software Development Kit (SDK) provided by Clerk for integrating authentication and user management into Expo applications.

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import Navigation from './src/navigation/navigation';
import { SafeAreaProvider } from "react-native-safe-area-context";

// import the store

import {Provider} from 'react-redux';
import {store} from './src/store/store';



export default function App() {

  const publishableKey = 'pk_test_a2V5LWhpcHBvLTQwLmNsZXJrLmFjY291bnRzLmRldiQ';
                         
    return (
   <>
   <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <Provider store={store}> 
            <Navigation/>
        </Provider> 
      </SafeAreaProvider> 
   </ClerkProvider>

           
</>
    );
}