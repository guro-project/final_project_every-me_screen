import { useState } from "react"
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import TodoRegistered from "../Todo/TodoRegistered";
import FoodIndexPage from "../diet/FoodIndexPage";
import FoodFirst from "../diet/FoodFirst";
import { Ionicons } from '@expo/vector-icons';




const Stack = createNativeStackNavigator();

const ToggleButton = () => {

    const [toggle, setToggle] = useState('식단');
    const navigation = useNavigation();
    const { width, height } = Dimensions.get('window');

    const toggleShowForm = (toggle) => {
        setToggle(toggle)
        console.log('toggle : ', toggle)
    };

    const page = () => {
        navigation.navigate("IngredientsSearch");
    }

    return (
        <View style={[styles.container]}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, toggle === '식단' && styles.selectedButton]}
                    onPress={() => toggleShowForm('식단')}
                >
                    <Text style={[styles.buttonText, toggle === '식단' && styles.selectedButtonText]}>식단</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, toggle === '계획' && styles.selectedButton]}
                    onPress={() => toggleShowForm('계획')}
                >
                    <Text style={[styles.buttonText, toggle === '계획' && styles.selectedButtonText]}>계획</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {toggle === '식단' && (
                    <FoodFirst />
                )}
                {toggle === '계획' && (
                    <TodoRegistered/>
                )}
            </View>

            <TouchableOpacity onPress={page} style={toggle === '식단'? styles.touch : styles.disable}><Ionicons name="add-circle-outline"  size={40} color='#03C75A'/></TouchableOpacity>

        </View>
    )

}

export default ToggleButton;


const styles = StyleSheet.create({
    touch: {
        zIndex: 999,
        position: 'absolute',
        bottom: Platform.OS === 'android' ? '5%' : '5%',
        right: '10%',
    },
    disable: {
        display: 'none',
    },
    container: {
        width: '100%',
    },
    buttonContainer: {
        zIndex: 999,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    button: {
        backgroundColor: 'lightgray',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: '#005000',
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
    selectedButtonText: {
        color: 'white',
    },
    content: {
    },
})