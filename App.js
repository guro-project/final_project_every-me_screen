import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import IndexPage from './components/pages/IndexPage';

const Stack = createNativeStackNavigator();

// npm start -- --reset-cache 


export default function App() {


  return (
    <>
      <StatusBar barStyle='default' />
      <NavigationContainer>
        <IndexPage />
      </NavigationContainer>
    </>
  );
}
