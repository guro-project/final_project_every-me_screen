import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPage from "./MyPage";
import AccountSettings from "./AccountSettings";
import PersonalInfo from "./PersonalInfo";
import PasswordReset from "./PasswordReset";
import ManageDiet from "./ManageDiet";
import ManageTodo from "./ManageTodo";
import CustomService from "./CustomService";
import ViewNotices from "../notices/ViewNotices";
import DetailViewNotice from "../notices/DetailViewNotice";
import ViewFaq from "../faq/faq";

const Stack = createNativeStackNavigator();

const MyPageIndex = () => {
    return (
        <Stack.Navigator
            initialRouteName='MyPages'
        >

            <Stack.Screen
                name='MyPages'
                component={MyPage}
                options={{ headerShown: false }}
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

            <Stack.Screen
                name='ManageTodo'
                component={ManageTodo}
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

            <Stack.Screen
                name="CustomService"
                component={CustomService}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ViewNotices"
                component={ViewNotices}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="DetailViewNotice"
                component={DetailViewNotice}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name="ViewFaq"
                component={ViewFaq}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default MyPageIndex;