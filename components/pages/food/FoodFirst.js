import { Button, Text, TouchableOpacity, View } from "react-native";

const FoodFirst = ({ navigation }) => {
    const page = () => {
        navigation.navigate("IngredientsSearch");
        console.log("클릭시 반응함?")
    }

    return(
        <View>
            <Text>첫 화면</Text>
            <TouchableOpacity onPress={page}>
                <Text>재료 등록 페이지 이동</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FoodFirst;