import * as React from 'react';
import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import AddScreen from '../screens/AddScreen';
import { MaterialIcons } from '@expo/vector-icons';
import DepositScreen from '../screens/DepositScreen';
import { FontAwesome } from '@expo/vector-icons';


import HomeNavigation from './HomeNavigation';

const Stack:any = createNativeStackNavigator();
const Drawer:any = createDrawerNavigator();

export default function MainNavigation() {
    return (
       
            <Drawer.Navigator
                drawerContent={(props:any) => <CustomDrawer {...props} />}
                screenOptions={{
                    drawerLabelStyle: { marginLeft: -25, fontSize: 17 },
                    drawerActiveBackgroundColor: 'white',
                    drawerActiveTintColor: 'black',
                    drawerInactiveTintColor: 'white',
                }
                }
            >
                <Drawer.Screen name='Home' component={HomeNavigation}
                    options={{
                        headerShown: false,
                        drawerIcon: ({ color, focused }) => (
                            <FontAwesome name="home" size={24} color={focused ? "black" : 'white'} />
                        )
                    }}

                />
                <Drawer.Screen name='Add' component={AddScreen}
                    options={{
                        drawerIcon: ({ color, focused }) => (
                            <MaterialIcons name="add-box" size={24} color={focused ? "black" : "white"} />
                        ),
                        headerShown: false
                    }} />
                <Drawer.Screen name='Deposit' component={DepositScreen}
                    options={{
                        drawerIcon: ({ color, focused }) => (
                            <MaterialIcons name="payment" size={24} color={focused ? "black" : "white"} />
                        ),
                        headerShown: false
                    }} />
            </Drawer.Navigator>
      
    );
}