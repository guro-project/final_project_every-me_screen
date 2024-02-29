import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainPage from "./MainPage";
import Login from "./security/Login";
import SignUp from "./security/SignUp";
import EmailSignUp from "./security/EmailSignUp";
import KaKaoLogin from "./security/KakaoLogin";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import * as Animatable from 'react-native-animatable';


const Stack = createNativeStackNavigator();

const IndexPage = () => {

    const [loaded, setloaded] = useState(false);

    const fadeInOut = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const loadingInterval = setInterval(() => {
            setloaded(true);
            clearInterval(loadingInterval);
        }, 3000)

        return () => clearInterval(loadingInterval);
    },[])

    if (!loaded) {
        return (
            <View style={styles.container}>
                <Animatable.Image
                    animation="fadeIn"
                    duration={3000} // 애니메이션 지속 시간
                    source={require('everyme_screen/images/logo.png')}
                    style={{ borderRadius: 100 }}
                />
            </View>
        )
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
                name='MainPage'
                component={MainPage}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='SignUp'
                component={SignUp}
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