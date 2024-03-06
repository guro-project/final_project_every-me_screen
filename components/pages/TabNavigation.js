import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import MainPage from "./MainPage";
import HealthPage from "./health/HealthPage";
import AddPage from "./function/AddPage";
import Community from "./function/Community";
import Chatbot from "./function/ChatBot";
import { StatusBar } from "react-native";
import FoodIndexPage from "./diet/FoodIndexPage";

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
                        tabBarIcon: ({focused}) => focused ? (<Ionicons name="people-circle-outline" size={30} color='#03C75A'/>) : (<Ionicons name="people-circle-outline" size={30} color='#C1C1C1'/>),
                        headerShown: false,
                    }}
                />

                <Tab.Screen
                    name="ChatBot"
                    component={Chatbot}
                    options={{
                        tabBarIcon: ({focused}) => focused ? (<Ionicons name="chatbubbles-outline" size={30} color='#03C75A'/>) : (<Ionicons name="chatbubbles-outline" size={30} color='#C1C1C1'/>),
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

export default TabNavigation;
