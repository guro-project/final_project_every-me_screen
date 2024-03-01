import { createNativeStackNavigator } from "@react-navigation/native-stack"
import IngredientsSearch from "./IngredientsSearch"
import FoodFirst from "./FoodFirst";
import DetailIngredients from "./DetailIngredients";

const Stack = createNativeStackNavigator();

const FoodIndexPage = () => {
    const pageHandler = () => {
        console.log("화면 이동")
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
                    title:"재료 검색 화면"
                }}
                listeners={pageHandler}
            />
            <Stack.Screen
                name="FoodFirst"
                component={FoodFirst}
            />
            <Stack.Screen
                name="DetailIngredients"
                component={DetailIngredients}
                options={{
                    title:"재료 담은 화면"
                }}
                listeners={pageHandler}
            />
        </Stack.Navigator>
    )
}

export default FoodIndexPage;