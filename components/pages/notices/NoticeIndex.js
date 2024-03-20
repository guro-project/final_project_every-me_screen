import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ViewNotices from "./ViewNotices";
import DetailViewNotice from "./DetailViewNotice";

const Stack = createNativeStackNavigator();

const NoticeIndex = () => {


    return (
        <Stack.Navigator
            initialRouteName="ViewNotices"
        >
            <Stack.Screen
                name="ViewNotices"
                component={ViewNotices}
            />
            <Stack.Screen
                name="DetailViewNotice"
                component={DetailViewNotice}
            />
        </Stack.Navigator>
    )

}

export default NoticeIndex;