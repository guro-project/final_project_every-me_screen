import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const CustomService = () => {
    const navigation = useNavigation();
    return (
        <>
            <Text style={styles.title}>고객센터</Text>
            <View style={styles.container}>
                <View style={[styles.menuContainer, {marginBottom: 10}]}>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewNotices')}>
                        <View style={{alignItems: 'center'}}>
                            <Ionicons name="reader-outline" size={30} color={'white'}/>
                        </View>
                        
                        <Text style={styles.titleText}>공지사항</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.menuContainer, {marginTop: 10}]}>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewFaq')}>
                        <View style={{alignItems: 'center'}}>
                            <Ionicons name="help-outline" size={30} color={'white'} />
                        </View>
                        
                        <Text style={styles.titleText}>FAQ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default CustomService;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
        top: '25%',
        left: '39%',
        zIndex: 999
    },
    menuContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        padding: 15,
        width: '80%',
        height: 100,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    }
})