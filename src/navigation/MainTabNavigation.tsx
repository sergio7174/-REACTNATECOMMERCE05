/** menu topDown in this App */
import * as React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; import { getHeaderTitle } from '@react-navigation/elements';
import { FontAwesome } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Color from '../theme/Color';
/*** import screens components */
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import AddScreen from '../screens/AddScreen';
import DepositScreen from '../screens/DepositScreen';

const Tab:any = createBottomTabNavigator();
const Stack:any = createNativeStackNavigator();

const OrderHistoryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="OrderHistoryScreen" component={OrderHistoryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}



export default function MainTabNavigation() {


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    paddingHorizontal: wp(1),
                    paddingTop: 0,
                    backgroundColor: Color.background,
                    position: 'absolute',
                    borderTopWidth: 0,
                },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName:any;

                    if (route.name === 'HomeScreen') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                    } else if (route.name === 'CartScreen') {
                        iconName = focused ? 'shopping-cart' : 'shopping-cart';
                    }
                    else if (route.name === 'OrderHistoryStack') {
                        iconName = focused ? 'bell' : 'bell-o';
                    }
                    else if (route.name === 'AddScreen') {
                        iconName = focused ? 'plus-circle' : 'plus';
                    }
                    else if (route.name === 'DepositScreen') {
                        iconName = focused ? 'download' : 'dollar';
                    }

                    // You can return any component that you like here!
                    return <FontAwesome name={iconName} size={hp(4)} color={color} />
                },
                tabBarActiveTintColor: Color.orangeTextHex,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            {/** HomeScreen its the mean component  */}
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="CartScreen" component={CartScreen} />
            <Tab.Screen name="OrderHistoryStack" component={OrderHistoryStack} />
            <Tab.Screen name="AddScreen" component={AddScreen} />
            <Tab.Screen name="DepositScreen" component={DepositScreen} />

        </Tab.Navigator>
    )
}