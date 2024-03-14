import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import MainPage from "./MainPage";
import HealthPage from "./health/HealthPage";
import AddPage from "./function/AddPage";
import Community from "./function/Community";
import { StatusBar } from "react-native";
import FoodIndexPage from "./diet/FoodIndexPage";
import MyPageIndex from "./myPages/MyPageIndex";


const Tab = createBottomTabNavigator();

const TabNavigation = () => {

    return (
        <>
            <StatusBar barStyle="light-content"/>
            <Tab.Navigator
                screenOptions={{tabBarStyle: {backgroundColor:'black', borderTopWidth: 0.2}}}
                initialRouteName='Home'
            >
                <Tab.Screen
                    name="Home"
                    component={FoodIndexPage}
                    options={{
                        tabBarIcon: ({focused}) => focused ? (<Ionicons name="calendar-outline" size={30} color='#03C75A'/>) : (<Ionicons name="calendar-outline" size={30} color='#C1C1C1'/>),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Health"
                    component={HealthPage}
                    options={{
                        tabBarIcon: ({focused}) => focused ? (<Ionicons name="barbell-outline" size={30} color='#03C75A'/>) : (<Ionicons name="barbell-outline" size={30} color='#C1C1C1'/>),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Add"
                    component={AddPage}
                    options={{
                        tabBarIcon: ({focused}) => focused ? (<Ionicons name="add-outline" size={30} color='#03C75A'/>) : (<Ionicons name="add-outline" style={{}} size={30} color='#C1C1C1'/>),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="Community"
                    component={Community}
                    options={{
                        tabBarIcon: ({focused}) => focused ? (<Ionicons name="clipboard-outline" size={30} color='#03C75A'/>) : (<Ionicons name="clipboard-outline" size={30} color='#C1C1C1'/>),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="MyPage"
                    component={MyPageIndex}
                    options={{
                        tabBarIcon: ({focused}) => focused ? (<Ionicons name="person-circle-outline" size={30} color='#03C75A'/>) : (<Ionicons name="person-circle-outline" size={30} color='#C1C1C1'/>),
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

export default TabNavigation;
