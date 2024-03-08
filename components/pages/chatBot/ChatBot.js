import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Chatbot = () => {
    const navigation = useNavigation();

    const logOut = async () => {
        try {
            // AsyncStorage에서 토큰을 지웁니다.
            await AsyncStorage.removeItem('userToken');
            // 앱을 완전히 초기화하여 초기화면으로 이동합니다.
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.log('로그아웃 중 오류가 발생했습니다.', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Chatbot</Text>
            <TouchableOpacity onPress={logOut}>
                <Text style={{ color: 'white' }}>로그아웃</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Chatbot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
