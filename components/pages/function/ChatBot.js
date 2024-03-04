import { StyleSheet, Text, View } from "react-native";


const Chatbot = () => {
    return (
        <>
            <View style={styles.container}>
                <Text>Chatbot</Text>
            </View>
        </>
    )
}

export default Chatbot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
})