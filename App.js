import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import IndexPage from './components/pages/IndexPage';
import IngredientsSearch from './components/pages/food/IngredientsSearch';
import FoodFirst from './components/pages/food/FoodFirst';
import FoodIndexPage from './components/pages/food/FoodIndexPage';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <>
      <StatusBar barStyle='default' />
      <NavigationContainer>
        {/* <IndexPage /> */}
        <FoodIndexPage/>
      </NavigationContainer>
    </>
  );
}
