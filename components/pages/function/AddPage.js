import { StyleSheet, Text, View } from "react-native";


const AddPage = () => {
    return (
        <>
            <View style={styles.container}>
                <Text>Add Page</Text>
            </View>
        </>
    )
}

export default AddPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
})