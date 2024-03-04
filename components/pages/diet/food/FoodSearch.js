import { useRoute } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"

const FoodSearch = ({navigation}) => {
    const route = useRoute()
    const category = route.params
    console.log("카테고리 받아왔나?")
    console.log(category)

    const page = () => {
        navigation.navigate("DetailFood", category)
    }

    return(
        <View>
            <Text>음식 검색</Text>
            <TouchableOpacity onPress={page}>
                <Text>이동</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FoodSearch;