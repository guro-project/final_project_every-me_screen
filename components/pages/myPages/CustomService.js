import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const CustomService = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={{marginTop:100}}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewNotices')}>
                        <Ionicons name="reader-outline" />
                        <Text>공지사항</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewFaq')}>
                        <Ionicons name="help-outline" />
                        <Text>FAQ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default CustomService;