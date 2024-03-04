import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import IndexPage from './components/pages/IndexPage';
import FoodIndexPage from './components/pages/diet/FoodIndexPage';

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
