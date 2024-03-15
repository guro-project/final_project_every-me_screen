import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FoodIndexPage from "../diet/FoodIndexPage";
import Todo from "../Todo/Todo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Agenda } from "react-native-calendars";
import FoodFirst from "../diet/FoodFirst";
import FAQScreen from "../faq/faq";
import FoodRegistered from "./FoodRegistered";
import FetchTodo from "../Todo/TodoRegistered";
import TodoRegistered from "../Todo/TodoRegistered";
import FoodFirstCalendar from "./FoodFirstCalendar";



const Stack = createNativeStackNavigator();

const ToggleButton = () => {

    const [toggle, setToggle] = useState("");
    const navigation = useNavigation();

    const toggleShowForm = (toggle) => {
        setToggle(toggle)
        console.log(toggle)
    };

    return (
        <View style={styles.container}>
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
                    <FoodFirstCalendar />
                )}
                {toggle === '계획' && (
                    <TodoRegistered/>
                )}
            </View>
        </View>
    )

}

export default ToggleButton;


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'lightgray',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: 'green',
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
    selectedButtonText: {
        color: 'white',
    },
    content: {
        flex: 1
    },
})