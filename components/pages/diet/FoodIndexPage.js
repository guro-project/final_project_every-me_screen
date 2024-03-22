import { createNativeStackNavigator } from "@react-navigation/native-stack"
import IngredientsSearch from "./ingredients/IngredientsSearch"
import FoodFirst from "./FoodFirst";
import FoodSearch from "./food/FoodSearch";
import RegistFood from "./food/RegistFood";

const Stack = createNativeStackNavigator();

const FoodIndexPage = () => {
    const pageHandler = () => {
        // console.log("화면 이동")
    }

    return(
        <Stack.Navigator
            initialRouteName="FoodFirst"

            screenOptions={
                {
                    title: "식단 첫 페이지",
                    headerStyle: { backgroundColor: "#f4511e" },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold"
                    },
                    contentStyle: {
                        backgroundColor: "white"
                    }
                }
            }
        >
            <Stack.Screen
                name="IngredientsSearch"
                component={IngredientsSearch}
                options={{
                    headerShown : false
                }}
                listeners={pageHandler}
            />
            <Stack.Screen
                name="FoodFirst"
                component={FoodFirst}
                options={{
                    headerShown : false
                }}
            />
            <Stack.Screen
                name="FoodSearch"
                component={FoodSearch}
                options={{
                    headerShown : false
                }}
            />
            <Stack.Screen
                name="RegistFood"
                component={RegistFood}
                options={{
                    headerShown : false
                }}
            />
            
        </Stack.Navigator>
    )
}

export default FoodIndexPage;
