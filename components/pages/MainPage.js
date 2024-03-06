import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from "react-native";



const MainPage = ({navigation}) => {

    const firstFoodpage = () => {
        navigation.navigate("FoodIndexPage")
        console.log("이동됨?")
    }

    return (
        <>
            
            <View style={styles.container}>
                <Text>Main Page</Text>
                <TouchableOpacity onPress={firstFoodpage}>
                    <Text style={{color:'white'}}>식단 등록하기</Text>
                </TouchableOpacity>
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