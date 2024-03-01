import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import IndexPage from './components/pages/IndexPage';
import IngredientsSearch from './components/pages/food/IngredientsSearch';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <>
      <StatusBar barStyle='default' />
      <NavigationContainer>
        {/* <IndexPage /> */}
        <IngredientsSearch/>
      </NavigationContainer>
    </>
  );
}
