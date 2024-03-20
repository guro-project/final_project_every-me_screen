import { StyleSheet, Text, View } from "react-native";
import ViewNotices from "../notices/ViewNotices";


const AddPage = () => {
    return (
        <>
            <View style={styles.container}>
                {/* <Text>Add Page</Text> */}
                <Text>
                    <ViewNotices/>
                </Text>
            </View>
        </>
    )
}

export default AddPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
})