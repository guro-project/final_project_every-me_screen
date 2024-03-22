import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPage from "./MyPage";
import AccountSettings from "./AccountSettings";
import PersonalInfo from "./PersonalInfo";
import PasswordReset from "./PasswordReset";
import ManageDiet from "./ManageDiet";
import SelectDiet from "./SelectDiet";

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
                name='ManageDiet'
                component={ManageDiet}
                options={{ headerShown: false }}
            />

            {/* <Stack.Screen
                name='SelectDiet'
                component={SelectDiet}
                options={{ headerShown: false }}
            /> */}

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