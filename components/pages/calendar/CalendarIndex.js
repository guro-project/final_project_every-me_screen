import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarView from "./Calendar";
import FoodFirst from "../diet/FoodFirst";
import IngredientsSearch from "../diet/ingredients/IngredientsSearch";
import FoodSearch from "../diet/food/FoodSearch";
import RegistFood from "../diet/food/RegistFood";


const Stack = createNativeStackNavigator();

const CalendarIndexPage = () => {
  const pageHandler = () => {
    // console.log("화면 이동 ")
  }

  return (
    <Stack.Navigator initialRouteName="CalendarView">
      <Stack.Screen
        name="IngredientsSearch"
        component={IngredientsSearch}
        options={{
          headerShown: false
        }}
        listeners={pageHandler}
      />
      <Stack.Screen
        name="CalendarView"
        component={CalendarView}
        options={{
          headerShown: false,
          contentStyle: {backgroundColor: 'black'}
        }}
      />
      <Stack.Screen
        name="FoodFirst"
        component={FoodFirst}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="FoodSearch"
        component={FoodSearch}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="RegistFood"
        component={RegistFood}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default CalendarIndexPage;