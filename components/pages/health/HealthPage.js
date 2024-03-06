import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native"
import Stopwatch from "./StopWatch";
import HealthHome from "./HealthHome";

const Stack = createNativeStackNavigator();

const HealthPage = () => {
    return (
        <Stack.Navigator
            initialRouteName='Stopwatch'
        >
            <Stack.Screen
                name="HealthHome"
                component={HealthHome}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Stopwatch"
                component={Stopwatch}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default HealthPage;
