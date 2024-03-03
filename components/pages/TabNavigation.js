import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import MainPage from "./MainPage";
import HealthPage from "./health/HealthPage";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={MainPage}
                options={{
                    tapBarIcon: ({focused}) => focused ? (<Ionicons name="calendar-outline" size={30} color='green'/>) : (<Ionicons name="calendar-outline" size={30} color='black'/>),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Health"
                component={HealthPage}
                options={{
                    tapBarIcon: ({focused}) => focused ? (<Ionicons name="barbell-outline" size={30} color='green'/>) : (<Ionicons name="barbell-outline" size={30} color='black'/>),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation;
