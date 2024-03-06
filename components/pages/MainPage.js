import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, StyleSheet, Text, View } from "react-native";



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
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
})