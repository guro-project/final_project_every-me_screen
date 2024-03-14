import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "./MainPage";
import Login from "./security/Login";
import EmailSignUp from "./security/EmailSignUp";
import KaKaoLogin from "./security/KakaoLogin";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import TabNavigation from "./TabNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import FirstLogin from "./firstLogin/FirstLogin";


const Stack = createNativeStackNavigator();

const IndexPage = () => {

    const navigation = useNavigation();

    const [loggedIn, setLoggedIn] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                setLoggedIn(true);
            }
            setLoaded(true);
        }
        checkLogin();
    }, [loggedIn]);

    if (!loaded) {
        return (
            <View style={styles.container}>
                <Animatable.Image
                    animation="fadeIn"
                    duration={3000} // 애니메이션 지속 시간
                    source={require('../../images/logo.png')}
                    style={{ borderRadius: 100 }}
                />
            </View>
        );
    }

    if (loggedIn) {
        return (
            <Stack.Navigator initialRouteName='TabNavigation'>
                <Stack.Screen
                    name='TabNavigation'
                    component={TabNavigation}
                    options={{ headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                name='EmailSignUp'
                component={EmailSignUp}
                options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='MainPage'
                    component={MainPage}
                    options={{ headerShown: false}}
                />

                <Stack.Screen
                    name='FirstLogin'
                    component={FirstLogin}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    }
    

    return (
        <Stack.Navigator
            initialRouteName='Login'
        >

            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='TabNavigation'
                component={TabNavigation}
                options={{ headerShown: false, gestureEnabled: false }}
            />

            <Stack.Screen
                name='MainPage'
                component={MainPage}
                options={{ headerShown: false}}
            />

            <Stack.Screen
                name='FirstLogin'
                component={FirstLogin}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='EmailSignUp'
                component={EmailSignUp}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='KaKaoLogin'
                component={KaKaoLogin}
                options={{ headerShown: false }}
            />
            
        </Stack.Navigator>
    )
}

export default IndexPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        borderRadius: 100
    }
})