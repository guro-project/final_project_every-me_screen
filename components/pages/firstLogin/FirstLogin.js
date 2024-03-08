import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SetUserInfo from "./SetUserInfo";

const Stack = createNativeStackNavigator();

const FirstLogin = () => {
    return (
        <Stack.Navigator
            initialRouteName='SetUserInfo'
        >

            <Stack.Screen
                name='SetUserInfo'
                component={SetUserInfo}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

export default FirstLogin;
