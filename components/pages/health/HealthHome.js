import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"


const HealthHome = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Stopwatch')}>
                <Text style={{color: 'white'}}>StopWatch</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HealthHome;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
})