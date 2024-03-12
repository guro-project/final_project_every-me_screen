import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPage from "./MyPage";
import AccountSettings from "./AccountSettings";
import PersonalInfo from "./PersonalInfo";
import PasswordReset from "./PasswordReset";

const Stack = createNativeStackNavigator();

const MyPageIndex = () => {
    return (
        <Stack.Navigator
            initialRouteName='MyPages'
        >

            <Stack.Screen
                name='MyPages'
                component={MyPage}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name='AccountSettings'
                component={AccountSettings}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='PersonalInfo'
                component={PersonalInfo}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='PasswordReset'
                component={PasswordReset}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

export default MyPageIndex;