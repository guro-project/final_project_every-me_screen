import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PeedBoard from "./PeedBorad";

const Stack = createNativeStackNavigator();

const PeedIndex = () => {
    return (
        <Stack.Navigator
            initialRouteName='PeedBorad'
        >

            <Stack.Screen
                name='PeedBorad'
                component={PeedBoard}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

export default PeedIndex;