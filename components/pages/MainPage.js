import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from "react-native";

const Tab = createBottomTabNavigator();


const MainPage = () => {

    return (
        <>
            <View style={styles.container}>
                <Text>Main Page</Text>
            </View>
        </>
    )
}

export default MainPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})